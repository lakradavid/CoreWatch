// Mock data generator for demo deployment
export function generateMockStats() {
  const baseTime = Date.now();
  
  return {
    cpuUsage: (Math.random() * 40 + 20).toFixed(1), // 20-60%
    cpuTemp: Math.floor(Math.random() * 25 + 45), // 45-70°C
    cpuModel: 'Intel Core i7-12700K',
    cpuCores: 12,
    cpuThreads: 20,
    cpuSpeed: '3.6 GHz',
    
    ramUsagePercent: (Math.random() * 30 + 40).toFixed(1), // 40-70%
    ramTotal: 16,
    ramUsed: (Math.random() * 5 + 6).toFixed(2), // 6-11 GB
    ramType: 'DDR4',
    ramSpeed: '3200 MHz',
    
    diskUsagePercent: (Math.random() * 10 + 65).toFixed(1), // 65-75%
    diskTotal: 512,
    diskUsed: (Math.random() * 50 + 330).toFixed(2), // 330-380 GB
    
    gpuName: 'NVIDIA GeForce RTX 3070',
    gpuVendor: 'NVIDIA',
    gpuVram: '8192 MB',
    gpuUsage: 0,
    
    os: 'Windows 11 Pro',
    arch: 'x64',
    platform: 'win32',
    
    timestamp: baseTime
  };
}

// Generate realistic fluctuating data
let lastCpuUsage = 35;
let lastRamUsage = 55;

export function generateRealtimeMockStats() {
  // Simulate realistic fluctuations
  lastCpuUsage += (Math.random() - 0.5) * 10;
  lastCpuUsage = Math.max(15, Math.min(85, lastCpuUsage));
  
  lastRamUsage += (Math.random() - 0.5) * 5;
  lastRamUsage = Math.max(40, Math.min(75, lastRamUsage));
  
  const cpuUsage = lastCpuUsage.toFixed(1);
  const ramUsagePercent = lastRamUsage.toFixed(1);
  const ramUsed = ((lastRamUsage / 100) * 16).toFixed(2);
  
  return {
    cpuUsage,
    cpuTemp: Math.floor(45 + (lastCpuUsage / 100) * 25), // Temp correlates with usage
    cpuModel: 'Intel Core i7-12700K',
    cpuCores: 12,
    cpuThreads: 20,
    cpuSpeed: '3.6 GHz',
    
    ramUsagePercent,
    ramTotal: 16,
    ramUsed,
    ramType: 'DDR4',
    ramSpeed: '3200 MHz',
    
    diskUsagePercent: (Math.random() * 2 + 68).toFixed(1),
    diskTotal: 512,
    diskUsed: (Math.random() * 10 + 345).toFixed(2),
    
    gpuName: 'NVIDIA GeForce RTX 3070',
    gpuVendor: 'NVIDIA',
    gpuVram: '8192 MB',
    gpuUsage: 0,
    
    os: 'Windows 11 Pro',
    arch: 'x64',
    platform: 'win32',
    
    timestamp: Date.now()
  };
}
