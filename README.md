# 💰 Expense Tracker - Full Stack Application

A modern, beautiful expense tracking application built with **FastAPI** (Python), **React 19**, and **MongoDB**.

![Expense Tracker](https://img.shields.io/badge/Status-Live-success)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![React](https://img.shields.io/badge/React-19-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)

---

## 🌐 **LIVE DEMO - Try It Now!**

**No installation needed! Access the live version:**

```
https://editor-gateway.preview.emergentagent.com
```

Just click and start tracking your expenses! 🎉

---

## ✨ Features

### 💰 Income Management
- ✅ Add income with multiple categories (Salary, Freelance, Business, etc.)
- ✅ Track all income sources
- ✅ View total income at a glance
- ✅ Delete income records

### 💸 Expense Management
- ✅ Add expenses with emoji categories (🍔 Food, 🚗 Transport, 🎬 Entertainment, etc.)
- ✅ Track daily expenses
- ✅ Categorize spending
- ✅ Delete expense records

### 📊 Dashboard & Analytics
- ✅ Beautiful summary cards showing:
  - Total Income (Green)
  - Total Expenses (Red)
  - Current Balance (Blue/Orange)
- ✅ Recent transactions sidebar
- ✅ Real-time balance calculation
- ✅ Color-coded transaction history

### 🎨 Beautiful UI
- ✅ Modern, responsive design
- ✅ Gradient cards and smooth animations
- ✅ Tab-based navigation
- ✅ Mobile-friendly interface
- ✅ Built with Tailwind CSS

---

## 🚀 Quick Start

### Option 1: Use Cloud Version (Recommended)

Simply open: **https://editor-gateway.preview.emergentagent.com**

No setup required! Start using immediately.

### Option 2: Run Locally on Windows

1. **Download** the project
2. **Install prerequisites:**
   - Python 3.8+
   - Node.js 16+
   - MongoDB (or use MongoDB Atlas)
3. **Double-click** `check-prerequisites.bat`
4. **Double-click** `debug-start.bat` (first time setup)
5. **Double-click** `start.bat` (starts the app)
6. **Open** http://localhost:3000

📖 **Full Instructions:** See `WINDOWS_SETUP_GUIDE.md`

---

## 📁 Project Structure

```
expense-tracker/
│
├── start.bat                    # Windows: Start the app
├── debug-start.bat             # Windows: Setup & troubleshoot
├── check-prerequisites.bat     # Windows: Check installations
│
├── 📖 Documentation
│   ├── WINDOWS_SETUP_GUIDE.md  # Complete Windows guide
│   ├── QUICK_START.md          # Quick reference
│   └── DOWNLOAD_INSTRUCTIONS.md # How to download
│
├── backend/                    # FastAPI Backend
│   ├── server.py              # Main API server
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment config
│
└── frontend/                   # React Frontend
    ├── src/
    │   ├── components/        # React components
    │   │   ├── Dashboard.jsx
    │   │   ├── IncomeSection.jsx
    │   │   ├── ExpenseSection.jsx
    │   │   └── TransactionHistory.jsx
    │   ├── App.js            # Main app
    │   └── index.js          # Entry point
    ├── package.json          # Node dependencies
    └── .env                  # Frontend config
```

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Motor** - Async MongoDB driver for Python
- **Pydantic** - Data validation
- **Python 3.8+**

### Frontend
- **React 19** - Latest React with new features
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons

### Database
- **MongoDB** - NoSQL database for flexible data storage

---

## 📖 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get started in 5 minutes
- **[Windows Setup Guide](WINDOWS_SETUP_GUIDE.md)** - Complete local setup instructions
- **[Download Instructions](DOWNLOAD_INSTRUCTIONS.md)** - How to get the files

---

## 🎯 API Endpoints

When running locally, API docs available at: http://localhost:8001/docs

### Income Endpoints
- `POST /api/income` - Create income
- `GET /api/income` - Get all incomes
- `DELETE /api/income/{id}` - Delete income

### Expense Endpoints
- `POST /api/expense` - Create expense
- `GET /api/expense` - Get all expenses
- `DELETE /api/expense/{id}` - Delete expense

### Dashboard
- `GET /api/dashboard` - Get summary (totals, balance, recent transactions)

---

## 💻 Development

### Backend Development
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### Frontend Development
```bash
cd frontend
yarn install
yarn start
```

---

## 🔧 Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=expense_tracker
CORS_ORIGINS=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

---

## 🌟 Screenshots

**Dashboard with Summary Cards**
- Shows total income, expenses, and balance
- Recent transactions sidebar

**Income Section**
- Easy form to add income
- List of all income sources
- Category selection

**Expense Section**  
- Add expenses with emoji icons
- Categorized expense list
- Quick delete functionality

---

## 🐛 Troubleshooting

### Issue: Can't start the app
**Solution:** Run `debug-start.bat` to see detailed error messages

### Issue: MongoDB connection failed
**Solution:** Make sure MongoDB is running, or use MongoDB Atlas (cloud)

### Issue: Port already in use
**Solution:** Close other apps using ports 3000 or 8001

📖 **More help:** See `WINDOWS_SETUP_GUIDE.md` troubleshooting section

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🎊 Credits

Built with ❤️ using modern web technologies:
- FastAPI for blazing-fast backend
- React 19 for cutting-edge frontend
- MongoDB for flexible data storage
- Tailwind CSS for beautiful styling

---

## 🆘 Support

Need help?
1. Check the documentation files
2. Run `debug-start.bat` for diagnostics
3. Make sure all prerequisites are installed
4. Open an issue on GitHub

---

## 🌐 Access Links

- **Live App:** https://editor-gateway.preview.emergentagent.com
- **Local App:** http://localhost:3000
- **API Docs:** http://localhost:8001/docs (when running locally)

---

**Made with 💰 for better financial tracking!**
