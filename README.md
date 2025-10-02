# Hardhat项目模板

这是一个基于Hardhat的以太坊智能合约开发项目模板，包含了基本的项目结构和配置。

## 项目结构

```
├── contracts/        # 智能合约源代码目录
│   └── Greeter.sol   # 示例智能合约
├── test/             # 测试文件目录
│   └── Greeter.test.ts # 示例合约测试
├── scripts/          # 部署和其他脚本目录
│   └── deploy.ts     # 示例部署脚本
├── hardhat.config.ts # Hardhat配置文件
├── tsconfig.json     # TypeScript配置文件
└── package.json      # 项目依赖配置
```

## 环境要求

- **Node.js**: v18.19或v20.6及以上版本（重要！Hardhat 3.0.6需要此版本）
- **pnpm**: 包管理器

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 编译合约

```bash
npx hardhat compile
```

### 运行测试

```bash
npx hardhat test
```

### 部署合约

```bash
npx hardhat run scripts/deploy.ts
```

## 注意事项

1. 项目配置为ESM模块格式，请确保使用支持ESM的Node.js版本
2. 如果遇到编译错误，请检查您的Node.js版本是否符合要求
3. 详细的Node.js版本升级指南请参考[NODE_VERSION_UPGRADE_GUIDE.md](NODE_VERSION_UPGRADE_GUIDE.md)文件

## 相关文档

- [Hardhat官方文档](https://hardhat.org/docs)
- [Solidity文档](https://docs.soliditylang.org/)
- [Node.js版本升级指南](NODE_VERSION_UPGRADE_GUIDE.md)