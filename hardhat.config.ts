import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import * as path from "path";

// 明确指定 .env 文件路径
dotenv.config({ path: path.resolve(__dirname, '.env') });

// 调试信息：检查环境变量
console.log("PRIVATE_KEY 是否存在:", !!process.env.PRIVATE_KEY);
console.log("PRIVATE_KEY 值:", process.env.PRIVATE_KEY ? "已设置" : "未设置");

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/NNylsGC7DCdPv2ExafGvK",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
    }
  }
};

export default config;