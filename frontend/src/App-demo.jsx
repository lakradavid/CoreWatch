import { useState, useEffect, useRef } from 'react';
import Dashboard from './components/Dashboard';
import './App.css';
import { generateRealtimeMockStats } from './utils/mockData';

function App() {
  const [stats, setStats] = useState(null);
  const [connected, setConnected] = useState(false);
  const [history, setHistory] = useState({
    cpu: [],
    ram: [],
    disk: []
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    // Simulate connection
    setConnected(true);
    
    // Generate initial stats
    const initialStats = generateRealtimeMockStats();
    setStats(initialStats);

    // Update stats every 2 seconds with mock data
    intervalRef.current = setInterval(() => {
      const newStats = generateRealtimeMockStats();
      setStats(newStats);

      // Update history for charts
      const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      
      setHistory(prev => {
        const newHistory = {
          cpu: [...prev.cpu, { time: currentTime, value: Number(newStats.cpuUsage) || 0 }].slice(-20),
          ram: [...prev.ram, { time: currentTime, value: Number(newStats.ramUsagePercent) || 0 }].slice(-20),
          disk: [...prev.disk, { time: currentTime, value: Number(newStats.diskUsagePercent) || 0 }].slice(-20)
        };
        return newHistory;
      });
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1>⚡ CoreWatch</h1>
          <p>Real-time Performance Tracker (Demo Mode)</p>
        </div>
        <div className={`status ${connected ? 'connected' : 'disconnected'}`}>
          <span className="status-dot"></span>
          {connected ? 'Demo Mode' : 'Disconnected'}
        </div>
      </header>
      {stats ? (
        <Dashboard stats={stats} history={history} />
      ) : (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading demo data...</p>
        </div>
      )}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '40px', 
        padding: '20px',
        background: 'rgba(30, 41, 59, 0.6)',
        borderRadius: '12px',
        maxWidth: '800px',
        margin: '40px auto 0'
      }}>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          ℹ️ This is a demo version with simulated data. 
          To monitor your actual system, clone the repository and run it locally.
        </p>
        <a 
          href="https://github.com/lakradavid/CoreWatch" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '16px',
            padding: '10px 24px',
            background: '#60a5fa',
            color: '#0f172a',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
}

export default App;
