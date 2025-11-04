from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ==================== MODELS ====================

# Income Models
class IncomeCreate(BaseModel):
    title: str
    amount: float
    category: str
    description: Optional[str] = ""
    date: str

class Income(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    amount: float
    category: str
    description: Optional[str] = ""
    date: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Expense Models
class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category: str
    description: Optional[str] = ""
    date: str
    icon: Optional[str] = "💰"

class Expense(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    amount: float
    category: str
    description: Optional[str] = ""
    date: str
    icon: Optional[str] = "💰"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Dashboard Summary Model
class DashboardSummary(BaseModel):
    total_income: float
    total_expense: float
    balance: float
    recent_transactions: List[dict]


# ==================== INCOME ROUTES ====================

@api_router.post("/income", response_model=Income)
async def create_income(income_data: IncomeCreate):
    income = Income(**income_data.model_dump())
    doc = income.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.incomes.insert_one(doc)
    return income

@api_router.get("/income", response_model=List[Income])
async def get_incomes():
    incomes = await db.incomes.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for income in incomes:
        if isinstance(income['created_at'], str):
            income['created_at'] = datetime.fromisoformat(income['created_at'])
    return incomes

@api_router.delete("/income/{income_id}")
async def delete_income(income_id: str):
    result = await db.incomes.delete_one({"id": income_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Income not found")
    return {"message": "Income deleted successfully"}


# ==================== EXPENSE ROUTES ====================

@api_router.post("/expense", response_model=Expense)
async def create_expense(expense_data: ExpenseCreate):
    expense = Expense(**expense_data.model_dump())
    doc = expense.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.expenses.insert_one(doc)
    return expense

@api_router.get("/expense", response_model=List[Expense])
async def get_expenses():
    expenses = await db.expenses.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for expense in expenses:
        if isinstance(expense['created_at'], str):
            expense['created_at'] = datetime.fromisoformat(expense['created_at'])
    return expenses

@api_router.delete("/expense/{expense_id}")
async def delete_expense(expense_id: str):
    result = await db.expenses.delete_one({"id": expense_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Expense not found")
    return {"message": "Expense deleted successfully"}


# ==================== DASHBOARD ROUTES ====================

@api_router.get("/dashboard", response_model=DashboardSummary)
async def get_dashboard_summary():
    # Get all incomes and expenses
    incomes = await db.incomes.find({}, {"_id": 0}).to_list(1000)
    expenses = await db.expenses.find({}, {"_id": 0}).to_list(1000)
    
    # Calculate totals
    total_income = sum(income['amount'] for income in incomes)
    total_expense = sum(expense['amount'] for expense in expenses)
    balance = total_income - total_expense
    
    # Get recent transactions (5 most recent)
    all_transactions = []
    for income in incomes:
        all_transactions.append({
            "type": "income",
            "title": income['title'],
            "amount": income['amount'],
            "category": income['category'],
            "date": income['date'],
            "created_at": income['created_at']
        })
    for expense in expenses:
        all_transactions.append({
            "type": "expense",
            "title": expense['title'],
            "amount": expense['amount'],
            "category": expense['category'],
            "date": expense['date'],
            "icon": expense.get('icon', '💰'),
            "created_at": expense['created_at']
        })
    
    # Sort by created_at
    all_transactions.sort(key=lambda x: x['created_at'], reverse=True)
    recent_transactions = all_transactions[:10]
    
    return DashboardSummary(
        total_income=total_income,
        total_expense=total_expense,
        balance=balance,
        recent_transactions=recent_transactions
    )

@api_router.get("/")
async def root():
    return {"message": "Expense Tracker API"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()