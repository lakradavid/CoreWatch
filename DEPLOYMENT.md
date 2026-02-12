# 🚀 CoreWatch Deployment Guide

## ⚠️ Important Note

CoreWatch is a **system monitoring tool** that requires access to your computer's hardware (CPU, RAM, disk, temperature sensors). This means:

- ❌ **Cannot run on Vercel/Netlify** - These are static hosting platforms
- ❌ **Cannot monitor remote servers** - Needs local hardware access
- ✅ **Best for local development** - Run on your own machine
- ✅ **Can deploy backend separately** - For remote monitoring of that specific server

## 🎯 Deployment Options

### Option 1: Local Development (Recommended)

This is the intended use case for CoreWatch - monitoring YOUR computer.

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Access at: `http://localhost:3000`

---

### Option 2: Deploy Backend to Cloud (Monitor Cloud Server)

If you want to monitor a cloud server's performance, deploy the backend there.

#### A. Deploy Backend to Railway

1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your CoreWatch repository
5. Configure:
   - **Root Directory:** `backend`
   - **Start Command:** `npm start`
   - **Port:** Railway will auto-assign
6. Add environment variable:
   ```
   PORT=5000
   ```
7. Deploy!

#### B. Deploy Backend to Render

1. Go to [Render.com](https://render.com)
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your CoreWatch repository
5. Configure:
   - **Name:** corewatch-backend
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
6. Deploy!

#### C. Update Frontend to Connect to Cloud Backend

After deploying backend, update `frontend/src/App.jsx`:

```javascript
// Replace this line:
const ws = new WebSocket('ws://localhost:5000');

// With your deployed backend URL:
const ws = new WebSocket('wss://your-backend-url.railway.app');
```

---

### Option 3: Deploy Frontend Only (Demo with Mock Data)

Deploy just the UI to Vercel with simulated data for demonstration purposes.

#### Steps:

1. Create `frontend/src/mockData.js`:
```javascript
export const getMockStats = () => ({
  cpuUsage: Math.random() * 30 + 20,
  cpuTemp: Math.random() * 20 + 45,
  ramUsagePercent: Math.random() * 20 + 40,
  // ... other mock data
});
```

2. Update `App.jsx` to use mock data in production

3. Deploy to Vercel:
```bash
cd frontend
vercel
```

---

### Option 4: Docker Deployment (Self-Hosted)

Create a Docker container to run on your own server.

**Create `Dockerfile` in root:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Install frontend dependencies and build
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend ./frontend
RUN cd frontend && npm run build

# Copy backend code
COPY backend ./backend

EXPOSE 5000 3000

# Start both services
CMD ["sh", "-c", "cd backend && npm start & cd frontend && npm run preview"]
```

**Build and run:**
```bash
docker build -t corewatch .
docker run -p 5000:5000 -p 3000:3000 corewatch
```

---

## 🌐 Vercel Deployment (Frontend Only)

Since Vercel doesn't support WebSocket servers, you can only deploy the frontend:

### Quick Deploy:

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Follow prompts:**
   - Link to existing project? No
   - Project name: corewatch
   - Directory: `./frontend`
   - Build command: `npm run build`
   - Output directory: `dist`

### Or Deploy via Vercel Dashboard:

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variable:
   ```
   VITE_WS_URL=wss://your-backend-url.com
   ```
5. Deploy!

---

## 📊 Recommended Architecture

For a production system monitoring dashboard:

```
┌─────────────────┐
│   Your Server   │
│   (Backend)     │ ← Monitors this server's hardware
│   Railway/      │
│   Render/VPS    │
└────────┬────────┘
         │ WebSocket
         │
┌────────▼────────┐
│   Frontend      │
│   (Vercel)      │ ← Users access this
│   Static Site   │
└─────────────────┘
```

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_WS_URL=ws://localhost:5000
# or for production:
VITE_WS_URL=wss://your-backend.railway.app
```

---

## 🐛 Troubleshooting

### WebSocket Connection Failed
- Ensure backend is running and accessible
- Check if firewall is blocking the port
- Use `wss://` (secure) for HTTPS sites

### Temperature Not Showing
- Temperature sensors may not be available on all systems
- Works best on physical hardware, not VMs

### High CPU Usage
- Already optimized to update every 2 seconds
- Reduce update frequency in `backend/server.js` if needed

---

## 💡 Best Use Cases

1. **Local Development** - Monitor your dev machine
2. **Self-Hosted Server** - Deploy on your VPS to monitor it
3. **Demo/Portfolio** - Deploy frontend with mock data
4. **Internal Tool** - Run on company servers for monitoring

---

## 📞 Need Help?

- Check [GitHub Issues](https://github.com/lakradavid/CoreWatch/issues)
- Read the [README.md](README.md)
- Review [SETUP_GITHUB.md](SETUP_GITHUB.md)

---

**Remember:** CoreWatch is designed to monitor the machine it runs on. For cloud deployment, the backend must run on the server you want to monitor!
