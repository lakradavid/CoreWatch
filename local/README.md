# 🏠 CoreWatch - Local Mode

This folder contains CoreWatch configured for local monitoring of YOUR computer.

## 🚀 Quick Start

### Step 1: Start Backend

Open a terminal in this folder and run:

```bash
cd backend
npm install
npm start
```

You should see:
```
CoreWatch Backend running on port 5000
System monitoring initialized
```

### Step 2: Start Frontend

Open a NEW terminal in this folder and run:

```bash
cd frontend
npm install
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:3000/
```

### Step 3: Open in Browser

Visit: **http://localhost:3000**

You should now see your real system stats! 🎉

---

## 📊 What You'll Monitor

- ✅ Real CPU usage and temperature
- ✅ Real RAM usage (type, speed, capacity)
- ✅ Real disk usage
- ✅ Live charts updating every 2 seconds
- ✅ Smart alerts for high CPU usage
- ✅ Temperature warnings

---

## 🔧 Troubleshooting

### Backend won't start
- Make sure port 5000 is not in use
- Check if Node.js is installed: `node --version`
- Delete `node_modules` folder and run `npm install` again

### Frontend shows "Connecting..."
- Make sure backend is running first
- Check browser console for errors (F12)
- Verify WebSocket connection to `ws://localhost:5000`

### Temperature shows 0
- Temperature sensors may not be available on all systems
- Works best on physical hardware, not VMs
- This is normal on some systems

### High CPU usage from CoreWatch
- Already optimized to update every 2 seconds
- Close other applications
- Check Task Manager for other processes

---

## 🎯 Features

### Real-time Monitoring
- CPU usage percentage
- CPU temperature (if available)
- RAM usage with detailed specs
- Disk usage statistics

### Smart Alerts
- High CPU usage warning (≥75%)
- Critical CPU usage alert (≥90%)
- Critical temperature alert (≥85°C)

### System Information
- CPU: Model, cores, threads, speed
- GPU: Name, vendor, VRAM
- RAM: Total, type, speed
- OS: Name, architecture, platform

### Live Charts
- CPU usage history (last 40 seconds)
- RAM usage history (last 40 seconds)
- Smooth animations and transitions

---

## ⚙️ Configuration

### Change Update Frequency

Edit `backend/server.js`:

```javascript
// Line ~90: Change from 2000ms (2 seconds) to your preference
const fastInterval = setInterval(async () => {
  // ...
}, 2000); // Change this value
```

### Change Alert Thresholds

Edit `frontend/src/components/Dashboard.jsx`:

```javascript
// Line ~7: Adjust CPU thresholds
const getCpuStatus = (usage) => {
  if (usage >= 90) return { level: 'critical', ... }; // Change 90
  if (usage >= 75) return { level: 'high', ... };     // Change 75
  if (usage >= 50) return { level: 'moderate', ... }; // Change 50
  return { level: 'normal', ... };
};
```

---

## 📝 Notes

- This version monitors the computer it runs on
- Temperature monitoring depends on hardware sensors
- GPU usage monitoring is disabled to reduce CPU load
- Disk stats update every 10 seconds (slower changing data)

---

## 🆘 Need Help?

- Check the main [README.md](../README.md)
- Review [DEPLOYMENT.md](../DEPLOYMENT.md)
- Open an issue on [GitHub](https://github.com/lakradavid/CoreWatch/issues)

---

**Enjoy monitoring your system!** 🚀
