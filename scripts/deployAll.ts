import { ethers } from "hardhat";

// 部署参数类型定义
interface DeploymentOptions {
  deployGreeter?: boolean;
  deployTransfer?: boolean;
  greeterGreeting?: string;
}

async function main() {
  // 默认部署参数
  const options: DeploymentOptions = {
    deployGreeter: true,
    deployTransfer: true,
    greeterGreeting: "Hello, Hardhat!"
  };

  // 部署结果记录
  const deployments: Record<string, string> = {};

  console.log("开始部署合约...");
  console.log("====================================");

  // 部署Greeter合约
  if (options.deployGreeter) {
    console.log("部署Greeter合约...");
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy(options.greeterGreeting);
    
    await greeter.waitForDeployment();
    const greeterAddress = await greeter.getAddress();
    deployments["Greeter"] = greeterAddress;
    
    console.log(`✅ Greeter合约部署成功！地址: ${greeterAddress}`);
    console.log(`✅ 初始问候语: ${options.greeterGreeting}`);
    
    // 验证合约部署
    const currentGreeting = await greeter.greet();
    console.log(`✅ 验证成功: 当前问候语为 "${currentGreeting}"`);
  }

  console.log("------------------------------------");

  // 部署Transfer合约
  if (options.deployTransfer) {
    console.log("部署Transfer合约...");
    const Transfer = await ethers.getContractFactory("Transfer");
    const transfer = await Transfer.deploy();
    
    await transfer.waitForDeployment();
    const transferAddress = await transfer.getAddress();
    deployments["Transfer"] = transferAddress;
    
    console.log(`✅ Transfer合约部署成功！地址: ${transferAddress}`);
    
    // 验证合约部署
    const contractBalance = await transfer.getContractBalance();
    console.log(`✅ 验证成功: 合约当前余额为 ${ethers.formatEther(contractBalance)} ETH`);
  }

  console.log("====================================");
  console.log("部署完成！所有合约地址:");
  
  // 打印所有部署的合约地址
  for (const [contractName, address] of Object.entries(deployments)) {
    console.log(`${contractName}: ${address}`);
  }
  
  console.log("====================================");
}

// 执行主函数并处理错误
main().catch((error) => {
  console.error("部署过程中发生错误:", error);
  process.exitCode = 1;
});