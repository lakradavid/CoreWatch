import React, { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Chart.css';

const Chart = memo(function Chart({ title, data, color }) {
  // Ensure data is valid and limit to last 20 points for performance
  const validData = Array.isArray(data) ? data.slice(-20) : [];
  
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={validData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
          <XAxis
            dataKey="time"
            stroke="#64748b"
            tick={{ fontSize: 11, fill: '#64748b' }}
            tickLine={{ stroke: '#64748b' }}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke="#64748b"
            tick={{ fontSize: 11, fill: '#64748b' }}
            tickLine={{ stroke: '#64748b' }}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '8px',
              color: '#e2e8f0',
              fontSize: '12px',
              padding: '8px 12px'
            }}
            labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            itemStyle={{ color: color }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            dot={false}
            animationDuration={0}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if data length changed or last value changed
  if (prevProps.data.length !== nextProps.data.length) return false;
  if (prevProps.data.length === 0) return true;
  const prevLast = prevProps.data[prevProps.data.length - 1];
  const nextLast = nextProps.data[nextProps.data.length - 1];
  return prevLast?.value === nextLast?.value;
});

export default Chart;
