import React, { memo } from 'react';
import './StatCard.css';

const StatCard = memo(function StatCard({ title, value, unit, subtitle, icon, color }) {
  return (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      <div className="stat-value">
        <span className="value" style={{ color }}>{value}</span>
        <span className="unit">{unit}</span>
      </div>
      {subtitle && <div className="stat-subtitle">{subtitle}</div>}
      <div className="stat-bar">
        <div
          className="stat-bar-fill"
          style={{
            width: `${Math.min(value, 100)}%`,
            background: color
          }}
        ></div>
      </div>
    </div>
  );
});

export default StatCard;
