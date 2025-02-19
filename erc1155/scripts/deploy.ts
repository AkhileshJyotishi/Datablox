import { ethers } from "hardhat";

async function main() {
    const baseUri = "https://userpic.codeforces.org/3622517/title/e540732d795e7b41.jpg"; // Update with actual base URI
    
    console.log("Deploying DatasetOwnership contract...");
    const DatasetOwnership = await ethers.getContractFactory("DatasetOwnership");
    const datasetOwnership = await DatasetOwnership.deploy(baseUri);

    const tokenName = "DataEx";
    const tokenSymbol = "DST";

    const DatasetERC20Ownership = await ethers.getContractFactory("DatasetTokenERC20");
    const datasetERC20Ownership = await DatasetERC20Ownership.deploy(tokenName, tokenSymbol);
    await datasetOwnership.waitForDeployment();
    await datasetERC20Ownership.waitForDeployment();
    var val = await datasetOwnership.getAddress();
    var val2 = await datasetERC20Ownership.getAddress();

    console.log(`DatasetOwnership deployed to: ${val}`);
    console.log(`datasetERC20Ownership deployed to: ${val2}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});