import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件路径和目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 启用CORS，允许前端应用访问
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// JSON解析中间件
app.use(express.json());

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 获取所有合约的ABI信息
app.get('/api/contracts', (req, res) => {
  try {
    // 获取合约地址信息（如果有多个合约，可以扩展此对象）
    const contracts = {
      greeter: {
        address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // 部署的合约地址
        name: 'Greeter'
      }
    };
    
    res.json(contracts);
  } catch (error) {
    console.error('Error fetching contracts:', error);
    res.status(500).json({ error: 'Failed to fetch contracts' });
  }
});

// 获取特定合约的ABI
app.get('/api/contracts/:name/abi', (req, res) => {
  const { name } = req.params;
  
  try {
    let contractPath = '';
    
    // 根据合约名称确定ABI文件路径
    switch (name.toLowerCase()) {
      case 'greeter':
        contractPath = path.join(__dirname, '..', 'artifacts', 'contracts', 'Greeter.sol', 'Greeter.json');
        break;
      default:
        return res.status(404).json({ error: `Contract ${name} not found` });
    }
    
    // 动态导入合约ABI文件
    import(contractPath).then(contractData => {
      res.json(contractData.abi);
    }).catch(error => {
      console.error(`Error loading ABI for ${name}:`, error);
      res.status(500).json({ error: `Failed to load ABI for contract ${name}` });
    });
  } catch (error) {
    console.error('Error fetching ABI:', error);
    res.status(500).json({ error: 'Failed to fetch ABI' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`- GET http://localhost:${PORT}/health - Health check`);
  console.log(`- GET http://localhost:${PORT}/api/contracts - List of available contracts`);
  console.log(`- GET http://localhost:${PORT}/api/contracts/:name/abi - Get contract ABI`);
  console.log(`  Example: http://localhost:${PORT}/api/contracts/greeter/abi`);
});