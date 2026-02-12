const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const si = require('systeminformation');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

// Store static system info and cache
let staticInfo = {};
let lastStats = null;
let isFetchingStatic = false;
let isFetchingStats = false;
let isFetchingSlowStats = false;

// Initialize static system information with caching
async function initStaticInfo() {
  if (isFetchingStatic || Object.keys(staticInfo).length > 0) {
    return staticInfo;
  }
  
  isFetchingStatic = true;
  try {
    const cpu = await si.cpu();
    const osInfo = await si.osInfo();
    const graphics = await si.graphics();
    const mem = await si.memLayout();

    staticInfo = {
      cpuModel: cpu.manufacturer + ' ' + cpu.brand,
      cpuCores: cpu.cores,
      cpuThreads: cpu.physicalCores,
      cpuSpeed: cpu.speed + ' GHz',
      os: osInfo.distro + ' ' + osInfo.release,
      platform: osInfo.platform,
      arch: osInfo.arch,
      gpuName: graphics.controllers[0]?.model || 'N/A',
      gpuVram: graphics.controllers[0]?.vram ? (graphics.controllers[0].vram + ' MB') : 'N/A',
      gpuVendor: graphics.controllers[0]?.vendor || 'N/A',
      ramType: mem[0]?.type || 'N/A',
      ramSpeed: mem[0]?.clockSpeed ? (mem[0].clockSpeed + ' MHz') : 'N/A'
    };
    
    return staticInfo;
  } catch (error) {
    console.error('Error fetching static info:', error);
    return {};
  } finally {
    isFetchingStatic = false;
  }
}

// Get real-time system stats with optimized fetching and throttling
async function getSystemStats(skipStatic = false) {
  // Prevent concurrent fetches
  if (isFetchingStats && lastStats) {
    return lastStats;
  }

  isFetchingStats = true;
  
  try {
    // Only fetch CPU and memory - most lightweight operations
    const cpuLoad = await si.currentLoad();
    const mem = await si.mem();
    const cpuTemp = await si.cpuTemperature();

    const stats = {
      cpuUsage: parseFloat(cpuLoad.currentLoad.toFixed(1)),
      cpuTemp: cpuTemp.main || cpuTemp.max || 0,
      ramTotal: parseFloat((mem.total / (1024 ** 3)).toFixed(2)),
      ramUsed: parseFloat((mem.used / (1024 ** 3)).toFixed(2)),
      ramUsagePercent: parseFloat(((mem.used / mem.total) * 100).toFixed(1)),
      timestamp: Date.now()
    };

    // Use cached disk and GPU values if available
    if (lastStats) {
      stats.diskTotal = lastStats.diskTotal || 0;
      stats.diskUsed = lastStats.diskUsed || 0;
      stats.diskUsagePercent = lastStats.diskUsagePercent || 0;
      stats.gpuUsage = lastStats.gpuUsage || 0;
    } else {
      stats.diskTotal = 0;
      stats.diskUsed = 0;
      stats.diskUsagePercent = 0;
      stats.gpuUsage = 0;
    }

    // Merge with static info if available
    if (!skipStatic && Object.keys(staticInfo).length > 0) {
      Object.assign(stats, staticInfo);
    }

    lastStats = stats;
    return stats;
  } catch (error) {
    console.error('Error fetching system stats:', error);
    return lastStats; // Return cached stats on error
  } finally {
    isFetchingStats = false;
  }
}

// Get slower-updating stats (disk and GPU) - called less frequently
async function getSlowStats() {
  if (isFetchingSlowStats) {
    return null;
  }
  
  isFetchingSlowStats = true;
  
  try {
    // Fetch disk info only
    const disk = await si.fsSize();

    const totalDisk = disk.reduce((acc, d) => acc + d.size, 0);
    const usedDisk = disk.reduce((acc, d) => acc + d.used, 0);

    const result = {
      diskTotal: parseFloat((totalDisk / (1024 ** 3)).toFixed(2)),
      diskUsed: parseFloat((usedDisk / (1024 ** 3)).toFixed(2)),
      diskUsagePercent: parseFloat(((usedDisk / totalDisk) * 100).toFixed(1)),
      gpuUsage: 0 // GPU monitoring disabled to reduce CPU load
    };
    
    return result;
  } catch (error) {
    console.error('Error fetching slow stats:', error);
    return null;
  } finally {
    isFetchingSlowStats = false;
  }
}

// WebSocket connection handler with immediate data send and optimized updates
wss.on('connection', async (ws) => {
  console.log('Client connected');

  // Send immediate data on connection (use cached if available)
  if (lastStats) {
    ws.send(JSON.stringify(lastStats));
  } else {
    // Fetch and send initial data immediately
    const initialStats = await getSystemStats();
    if (initialStats && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(initialStats));
    }
  }

  // Update fast stats (CPU, RAM) every 2 seconds - much less frequent
  const fastInterval = setInterval(async () => {
    if (ws.readyState === WebSocket.OPEN) {
      const stats = await getSystemStats();
      if (stats) {
        ws.send(JSON.stringify(stats));
      }
    }
  }, 2000);

  // Update slow stats (Disk, GPU) every 10 seconds
  const slowInterval = setInterval(async () => {
    const slowStats = await getSlowStats();
    if (slowStats && lastStats) {
      Object.assign(lastStats, slowStats);
    }
  }, 10000);

  // Initial slow stats fetch after 1 second
  setTimeout(async () => {
    const slowStats = await getSlowStats();
    if (slowStats && lastStats) {
      Object.assign(lastStats, slowStats);
    }
  }, 1000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(fastInterval);
    clearInterval(slowInterval);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clearInterval(fastInterval);
    clearInterval(slowInterval);
  });
});

// REST endpoint for initial data
app.get('/api/stats', async (req, res) => {
  const stats = await getSystemStats();
  res.json(stats);
});

const PORT = process.env.PORT || 5000;

// Start server immediately and initialize static info in background
server.listen(PORT, async () => {
  console.log(`CoreWatch Backend running on port ${PORT}`);
  
  // Initialize static info and first stats in background
  await initStaticInfo();
  await getSystemStats();
  
  // Initialize slow stats
  const slowStats = await getSlowStats();
  if (slowStats && lastStats) {
    Object.assign(lastStats, slowStats);
  }
  
  console.log('System monitoring initialized');
});
