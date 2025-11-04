# 💰 Expense Tracker - Windows Setup Guide

Complete guide to run the Expense Tracker on your Windows computer.

---

## 🌐 Quick Access (No Installation Needed)

**Your app is ALREADY LIVE on the cloud:**

```
https://editor-gateway.preview.emergentagent.com
```

Just open this link in any browser - it's ready to use! 🎉

---

## 💻 Running Locally on Windows

If you want to run it on your own computer:

### Step 1: Download the Project

1. Download all files to a folder (e.g., `C:\ExpenseTracker\`)
2. Make sure you have these files:
   - `start.bat`
   - `debug-start.bat`
   - `check-prerequisites.bat`
   - `backend/` folder
   - `frontend/` folder

### Step 2: Install Required Software

**You need these installed on your computer:**

1. **Python 3.8+**
   - Download: https://www.python.org/downloads/
   - ⚠️ IMPORTANT: Check "Add Python to PATH" during installation

2. **Node.js 16+**
   - Download: https://nodejs.org/
   - Choose the LTS version
   - Comes with npm automatically

3. **MongoDB** (Choose ONE option):
   - **Option A:** Local Installation
     - Download: https://www.mongodb.com/try/download/community
     - Install as Windows Service
   - **Option B:** MongoDB Atlas (Cloud - FREE)
     - Visit: https://www.mongodb.com/cloud/atlas
     - Create free account and cluster
     - Get connection string
     - Update `backend/.env` with your connection string

### Step 3: Check If Everything Is Installed

1. Open your project folder
2. **Double-click** `check-prerequisites.bat`
3. It will show you what's installed and what's missing
4. Install anything that's missing, then restart your computer

### Step 4: Run Debug Check

1. **Double-click** `debug-start.bat`
2. This will:
   - Check all tools are installed (Steps 1-4)
   - Create virtual environment (Step 5-6)
   - Install all dependencies (Steps 7-8)
   - Create environment files (Steps 9-10)
3. Wait for all 10 steps to complete
4. Should say "ALL CHECKS COMPLETED!"

### Step 5: Start the Application

1. **Make sure MongoDB is running** (if using local MongoDB)
   - Check if MongoDB service is started
   - Or MongoDB Atlas connection is working

2. **Double-click** `start.bat`
3. Two command windows will open:
   - One for Backend (Python/FastAPI)
   - One for Frontend (React)
4. Wait about 30 seconds
5. Your browser will automatically open to: **http://localhost:3000**

### Step 6: Use the App! 🎉

The app should now be running locally on your computer at:
- **Main App:** http://localhost:3000
- **API Docs:** http://localhost:8001/docs

---

## 🐛 Troubleshooting

### Problem: "Python is not installed"
**Solution:** Install Python from https://www.python.org/downloads/
- Make sure to check "Add Python to PATH"
- Restart your computer after installation

### Problem: "Node.js is not installed"
**Solution:** Install Node.js from https://nodejs.org/
- Choose the LTS version
- Restart your computer after installation

### Problem: "MongoDB connection error"
**Solution:**
- **If using local MongoDB:** Make sure MongoDB service is running
  - Open Services (Press Win+R, type `services.msc`)
  - Find "MongoDB Server" and start it
- **If using MongoDB Atlas:** Check your connection string in `backend/.env`

### Problem: Black window opens and closes immediately
**Solution:** Run `debug-start.bat` first to see the actual error
- The debug script shows you exactly what's wrong
- Fix the issue it reports, then try again

### Problem: Port 3000 or 8001 already in use
**Solution:**
- Close any other apps using these ports
- Or edit the ports in the scripts

### Problem: Dependencies won't install
**Solution:**
- Make sure you have internet connection
- Try running as Administrator (right-click → Run as administrator)
- Delete `backend/venv` and `frontend/node_modules` folders, try again

---

## 📝 File Structure

```
ExpenseTracker/
│
├── start.bat                    ← DOUBLE-CLICK THIS TO START
├── debug-start.bat             ← Run this first to check everything
├── check-prerequisites.bat     ← Check if tools are installed
│
├── backend/                    ← Python FastAPI backend
│   ├── server.py              ← Main server code
│   ├── requirements.txt       ← Python dependencies
│   ├── .env                   ← Backend configuration
│   └── venv/                  ← Virtual environment (auto-created)
│
└── frontend/                   ← React frontend
    ├── src/                   ← React source code
    ├── package.json           ← Node dependencies
    ├── .env                   ← Frontend configuration
    └── node_modules/          ← Dependencies (auto-created)
```

---

## 🔄 Starting and Stopping

### To Start:
1. Double-click `start.bat`
2. Wait for both servers to start
3. Browser opens automatically

### To Stop:
- Close both command windows (Backend and Frontend)
- Or press `Ctrl+C` in each window

---

## 🌟 Two Ways to Use This App

### 1. Cloud Version (Easiest - No Setup!)
**URL:** https://editor-gateway.preview.emergentagent.com
- Always online
- No installation needed
- Access from anywhere
- Already configured and running

### 2. Local Version (Your Computer)
**URL:** http://localhost:3000
- Runs on your computer
- You have full control
- Works offline (after setup)
- Your own database

---

## ❓ FAQs

**Q: Which version should I use?**
A: Use the cloud version for quick access. Use local if you want to customize or work offline.

**Q: Do I need to install MongoDB?**
A: Not if using the cloud version. For local, you can use MongoDB Atlas (cloud) instead of local installation.

**Q: The .bat file doesn't work!**
A: Run `debug-start.bat` first - it will tell you exactly what's missing.

**Q: Can I customize the app?**
A: Yes! Edit files in `frontend/src/` for UI changes, `backend/server.py` for backend logic.

**Q: Where is my data stored?**
A: In MongoDB database. Cloud version uses cloud MongoDB. Local version uses your local MongoDB or MongoDB Atlas.

---

## 📞 Need Help?

If you're stuck:
1. Run `debug-start.bat` and read the error messages carefully
2. Check the troubleshooting section above
3. Make sure all prerequisites are installed
4. Try restarting your computer

---

## 🎊 Enjoy Your Expense Tracker!

Track your income and expenses easily with this beautiful app! 💰📊
