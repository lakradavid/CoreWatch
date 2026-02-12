import React, { memo } from 'react';
import StatCard from './StatCard';
import Chart from './Chart';
import './Dashboard.css';

const Dashboard = memo(function Dashboard({ stats, history }) {
  // Determine CPU status
  const getCpuStatus = (usage) => {
    if (usage >= 90) return { level: 'critical', text: 'Critical', color: '#ef4444' };
    if (usage >= 75) return { level: 'high', text: 'High', color: '#f59e0b' };
    if (usage >= 50) return { level: 'moderate', text: 'Moderate', color: '#eab308' };
    return { level: 'normal', text: 'Normal', color: '#10b981' };
  };

  // Determine temperature status
  const getTempStatus = (temp) => {
    if (temp >= 85) return { level: 'critical', text: 'Critical', color: '#ef4444' };
    if (temp >= 70) return { level: 'high', text: 'High', color: '#f59e0b' };
    if (temp >= 50) return { level: 'warm', text: 'Warm', color: '#eab308' };
    return { level: 'cool', text: 'Cool', color: '#10b981' };
  };

  const cpuStatus = getCpuStatus(stats.cpuUsage);
  const tempStatus = getTempStatus(stats.cpuTemp);

  return (
    <div className="dashboard">
      {/* Alert Banner */}
      {(cpuStatus.level === 'critical' || cpuStatus.level === 'high') && (
        <div className={`alert-banner alert-${cpuStatus.level}`}>
          <span className="alert-icon">⚠️</span>
          <div className="alert-content">
            <strong>CPU Usage Alert:</strong> Your CPU usage is {cpuStatus.text.toLowerCase()} at {stats.cpuUsage}%. 
            Consider closing unnecessary applications.
          </div>
        </div>
      )}

      {tempStatus.level === 'critical' && stats.cpuTemp > 0 && (
        <div className="alert-banner alert-critical">
          <span className="alert-icon">🔥</span>
          <div className="alert-content">
            <strong>Temperature Alert:</strong> CPU temperature is critical at {stats.cpuTemp}°C. 
            Ensure proper ventilation and cooling.
          </div>
        </div>
      )}

      <div className="system-info">
        {/* CPU Section */}
        <div className="info-section">
          <div className="info-section-title">🔥 Processor</div>
          <div className="info-item">
            <span className="label">Model</span>
            <span className="value">{stats.cpuModel || 'Loading...'}</span>
          </div>
          <div className="info-item">
            <span className="label">Cores / Threads</span>
            <span className="value">{stats.cpuCores || '-'} Cores / {stats.cpuThreads || '-'} Threads</span>
          </div>
          <div className="info-item">
            <span className="label">Base Speed</span>
            <span className="value">{stats.cpuSpeed || 'N/A'}</span>
          </div>
          {stats.cpuTemp > 0 && (
            <div className="info-item">
              <span className="label">Temperature</span>
              <span className="value" style={{ color: tempStatus.color }}>
                {stats.cpuTemp}°C ({tempStatus.text})
              </span>
            </div>
          )}
        </div>

        {/* GPU Section */}
        <div className="info-section">
          <div className="info-section-title">🎮 Graphics</div>
          <div className="info-item">
            <span className="label">GPU</span>
            <span className="value">{stats.gpuName || 'N/A'}</span>
          </div>
          <div className="info-item">
            <span className="label">Vendor</span>
            <span className="value">{stats.gpuVendor || 'N/A'}</span>
          </div>
          <div className="info-item">
            <span className="label">VRAM</span>
            <span className="value">{stats.gpuVram || 'N/A'}</span>
          </div>
        </div>

        {/* RAM Section */}
        <div className="info-section">
          <div className="info-section-title">💾 Memory</div>
          <div className="info-item">
            <span className="label">Total RAM</span>
            <span className="value">{stats.ramTotal || '0'} GB</span>
          </div>
          <div className="info-item">
            <span className="label">Type</span>
            <span className="value">{stats.ramType || 'N/A'}</span>
          </div>
          <div className="info-item">
            <span className="label">Speed</span>
            <span className="value">{stats.ramSpeed || 'N/A'}</span>
          </div>
        </div>

        {/* System Section */}
        <div className="info-section">
          <div className="info-section-title">💻 System</div>
          <div className="info-item">
            <span className="label">OS</span>
            <span className="value">{stats.os || 'Loading...'}</span>
          </div>
          <div className="info-item">
            <span className="label">Architecture</span>
            <span className="value">{stats.arch || 'N/A'}</span>
          </div>
          <div className="info-item">
            <span className="label">Platform</span>
            <span className="value">{stats.platform || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="CPU Usage"
          value={stats.cpuUsage}
          unit="%"
          subtitle={`Status: ${cpuStatus.text}`}
          icon="🔥"
          color={cpuStatus.color}
        />
        <StatCard
          title="RAM Usage"
          value={stats.ramUsagePercent}
          unit="%"
          subtitle={`${stats.ramUsed} GB / ${stats.ramTotal} GB`}
          icon="💾"
          color="#06b6d4"
        />
        <StatCard
          title="Disk Usage"
          value={stats.diskUsagePercent}
          unit="%"
          subtitle={`${stats.diskUsed} GB / ${stats.diskTotal} GB`}
          icon="💿"
          color="#10b981"
        />
      </div>

      <div className="charts-grid">
        <Chart
          title="CPU Usage History"
          data={history.cpu}
          color="#f59e0b"
        />
        <Chart
          title="RAM Usage History"
          data={history.ram}
          color="#06b6d4"
        />
      </div>
    </div>
  );
});

export default Dashboard;
