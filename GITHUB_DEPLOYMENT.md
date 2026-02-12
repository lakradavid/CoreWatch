# 🚀 Running CoreWatch on GitHub

You have **3 options** to run CoreWatch using GitHub:

## Option 1: GitHub Pages (Demo with Mock Data) ⭐ Easiest

Deploy a live demo with simulated data that anyone can view.

### Steps:

1. **Enable GitHub Pages:**
   - Go to your repo: https://github.com/lakradavid/CoreWatch
   - Click **Settings** → **Pages**
   - Under "Build and deployment":
     - Source: **GitHub Actions**
   - Click **Save**

2. **Trigger Deployment:**
   - The workflow will run automatically on next push
   - Or go to **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**

3. **Access Your Demo:**
   - After deployment completes (2-3 minutes)
   - Visit: `https://lakradavid.github.io/CoreWatch/`

**What you get:**
- ✅ Live demo anyone can access
- ✅ Simulated realistic data
- ✅ All UI features working
- ❌ Not monitoring real hardware

---

## Option 2: GitHub Codespaces (Full App in Cloud) 💻 Best for Testing

Run the complete application in a cloud development environment.

### Steps:

1. **Open Codespace:**
   - Go to: https://github.com/lakradavid/CoreWatch
   - Click green **Code** button
   - Select **Codespaces** tab
   - Click **Create codespace on main**

2. **Wait for Setup:**
   - Codespace will initialize (1-2 minutes)
   - Dependencies install automatically

3. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```

4. **Start Frontend (New Terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access Application:**
   - Codespaces will show popup with port 3000
   - Click "Open in Browser"
   - Or use the Ports tab

**What you get:**
- ✅ Full application running
- ✅ Real system monitoring (of the Codespace VM)
- ✅ Can test all features
- ✅ Free 60 hours/month
- ❌ Monitors the cloud VM, not your laptop

---

## Option 3: Clone and Run Locally 🏠 Best for Personal Use

Run on your own computer to monitor YOUR hardware.

### Steps:

1. **Clone Repository:**
   ```bash
   git clone https://github.com/lakradavid/CoreWatch.git
   cd CoreWatch
   ```

2. **Start Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Start Frontend (New Terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access:**
   - Open browser: `http://localhost:3000`

**What you get:**
- ✅ Monitors YOUR computer
- ✅ Real CPU temperature
- ✅ Real hardware stats
- ✅ Full functionality
- ✅ Best performance

---

## 📊 Comparison

| Feature | GitHub Pages | Codespaces | Local |
|---------|-------------|------------|-------|
| Setup Time | 5 min | 2 min | 5 min |
| Cost | Free | Free (60h/mo) | Free |
| Real Hardware | ❌ Mock | ✅ VM | ✅ Your PC |
| Public Access | ✅ Yes | ❌ No | ❌ No |
| Temperature | ❌ Simulated | ⚠️ VM Temp | ✅ Real |
| Best For | Demo/Portfolio | Testing | Daily Use |

---

## 🎯 Recommended Choice

- **Want to show it off?** → GitHub Pages
- **Want to test it quickly?** → Codespaces  
- **Want to monitor your PC?** → Local

---

## 🔧 Troubleshooting

### GitHub Pages Not Working?
1. Check Actions tab for errors
2. Ensure Pages is enabled in Settings
3. Wait 2-3 minutes after deployment

### Codespaces Not Starting?
1. Check if you have free hours remaining
2. Try deleting and recreating the codespace
3. Check the terminal for error messages

### Local Installation Issues?
1. Ensure Node.js 16+ is installed
2. Delete `node_modules` and reinstall
3. Check if ports 3000 and 5000 are available

---

## 📝 Notes

- **GitHub Pages** shows a banner indicating it's demo mode
- **Codespaces** monitors the cloud VM, not your laptop
- **Local** is the intended use case for CoreWatch

---

## 🌐 Live Demo

Once deployed, your demo will be at:
**https://lakradavid.github.io/CoreWatch/**

Share this link to show off your project! 🎉
