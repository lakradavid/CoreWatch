import { useState, useEffect, useRef } from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [stats, setStats] = useState(null);
  const [connected, setConnected] = useState(false);
  const [history, setHistory] = useState({
    cpu: [],
    ram: [],
    disk: []
  });
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connectWebSocket = () => {
    const ws = new WebSocket('ws://localhost:5000');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to CoreWatch backend');
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStats(data);

      // Update history for charts (keep last 20 data points to reduce memory and rendering)
      const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      
      setHistory(prev => {
        const newHistory = {
          cpu: [...prev.cpu, { time: currentTime, value: Number(data.cpuUsage) || 0 }].slice(-20),
          ram: [...prev.ram, { time: currentTime, value: Number(data.ramUsagePercent) || 0 }].slice(-20),
          disk: [...prev.disk, { time: currentTime, value: Number(data.diskUsagePercent) || 0 }].slice(-20)
        };
        return newHistory;
      });
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnected(false);
    };

    ws.onclose = () => {
      console.log('Disconnected from CoreWatch backend');
      setConnected(false);
      
      // Auto-reconnect after 2 seconds
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log('Attempting to reconnect...');
        connectWebSocket();
      }, 2000);
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1>⚡ CoreWatch</h1>
          <p>Real-time Performance Tracker</p>
        </div>
        <div className={`status ${connected ? 'connected' : 'disconnected'}`}>
          <span className="status-dot"></span>
          {connected ? 'Live' : 'Disconnected'}
        </div>
      </header>
      {stats ? (
        <Dashboard stats={stats} history={history} />
      ) : (
        <div className="loading">
          <div className="spinner"></div>
          <p>Connecting to system monitor...</p>
        </div>
      )}
    </div>
  );
}

export default App;
