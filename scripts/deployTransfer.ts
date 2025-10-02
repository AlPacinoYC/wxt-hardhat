import { ethers } from "hardhat";

async function main() {
  const Transfer = await ethers.getContractFactory("Transfer");
  const transfer = await Transfer.deploy();

  await transfer.waitForDeployment();

  console.log(
    `Transfer contract deployed to ${await transfer.getAddress()}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});