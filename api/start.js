// 简单的启动脚本，用于确保正确处理TypeScript文件
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting API Server...');

// 创建ts-node进程来运行server.ts
const tsNodeProcess = spawn('npx', ['ts-node', '--esm', '--experimental-specifier-resolution=node', 'api/server.ts'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: true
});

// 监听进程退出事件
process.on('SIGINT', () => {
  console.log('Stopping API Server...');
  tsNodeProcess.kill('SIGINT');
  process.exit(0);
});