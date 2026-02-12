# 🏠 Running CoreWatch Locally

To run CoreWatch on your local machine and monitor YOUR computer's hardware:

## Prerequisites

- Node.js 16 or higher
- npm or yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/lakradavid/CoreWatch.git
cd CoreWatch
```

### 2. Switch to Local Mode

Replace `frontend/src/main.jsx` content with:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App-local';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 3. Start Backend

Open a terminal and run:

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

### 4. Start Frontend

Open a NEW terminal and run:

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

### 5. Open in Browser

Visit: `http://localhost:3000`

You should now see your real system stats!

## Troubleshooting

### Backend won't start
- Make sure port 5000 is not in use
- Check if Node.js is installed: `node --version`
- Delete `node_modules` and run `npm install` again

### Frontend shows "Connecting..."
- Make sure backend is running first
- Check browser console for errors
- Verify WebSocket connection to `ws://localhost:5000`

### Temperature shows 0
- Temperature sensors may not be available on all systems
- Works best on physical hardware, not VMs
- This is normal on some systems

### High CPU usage
- Already optimized to update every 2 seconds
- Close other applications
- Check Task Manager for other processes

## Features You'll See

- ✅ Real CPU usage and temperature
- ✅ Real RAM usage
- ✅ Real disk usage
- ✅ Live charts
- ✅ Smart alerts for high usage

Enjoy monitoring your system! 🚀
