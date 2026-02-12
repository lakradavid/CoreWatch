# ⚡ CoreWatch - Real-time Performance Tracker

![CoreWatch Dashboard](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node.js-16+-green)
![React](https://img.shields.io/badge/React-18-blue)

A modern full-stack system monitoring dashboard that displays real-time CPU, RAM, and disk usage with beautiful charts, temperature monitoring, and intelligent alerts.

## ✨ Features

- 🔥 **Real-time CPU Monitoring** - Usage percentage with temperature tracking
- 💾 **RAM Monitoring** - Memory usage with type and speed information
- 💿 **Disk Usage** - Storage statistics updated every 10 seconds
- 🌡️ **Temperature Monitoring** - CPU temperature with color-coded status
- ⚠️ **Smart Alerts** - Automatic warnings for high CPU usage and critical temperatures
- 📊 **Live Charts** - Real-time usage history visualization
- 🎮 **Hardware Info** - Detailed CPU, GPU, and RAM specifications
- 🌐 **WebSocket Updates** - Instant data refresh every 2 seconds
- 🎨 **Professional UI** - Modern dark theme with glassmorphism effects
- ⚡ **Performance Optimized** - Low CPU footprint, won't heat up your laptop

## 📸 Screenshots

> Add your screenshots here after running the application

## 🎯 Use Cases

- Monitor system performance during development
- Track resource usage while running intensive applications
- Keep an eye on CPU temperature during gaming or rendering
- Identify resource bottlenecks in real-time
- Professional system monitoring for workstations

## Tech Stack

### Backend
- Node.js + Express
- WebSocket (ws)
- systeminformation package
- CORS enabled

### Frontend
- React 18
- Vite
- Recharts for data visualization
- Modern CSS with glassmorphism effects

## Installation

### Backend Setup
```bash
cd backend
npm install
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Start the backend server first
2. Start the frontend development server
3. Open your browser to `http://localhost:3000`
4. Watch your system stats update in real-time!

## API Endpoints

- `GET /api/stats` - Get current system statistics (REST)
- `WS ws://localhost:5000` - WebSocket connection for real-time updates

## System Requirements

- Node.js 16+ 
- npm or yarn
- Modern web browser with WebSocket support

## Project Structure

```
CoreWatch/
├── backend/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── Chart.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- GPU usage monitoring is disabled to reduce CPU overhead
- Temperature monitoring may not work on all systems (depends on hardware sensors)

## 🔮 Future Enhancements

- [ ] Network usage monitoring
- [ ] Process list with resource usage
- [ ] Historical data export
- [ ] Custom alert thresholds
- [ ] Multi-system monitoring
- [ ] Mobile responsive improvements

## 👨‍💻 Author

Your Name - [@yourusername](https://github.com/yourusername)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

Made with ❤️ using React and Node.js
