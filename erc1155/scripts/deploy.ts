import { ethers } from "hardhat";

async function main() {
    const baseUri = "https://example.com/metadata/"; // Update with actual base URI
    
    console.log("Deploying DatasetOwnership contract...");
    const DatasetOwnership = await ethers.getContractFactory("DatasetOwnership");
    const datasetOwnership = await DatasetOwnership.deploy(baseUri);

    await datasetOwnership.waitForDeployment();
    var val = await datasetOwnership.getAddress();
    console.log(`DatasetOwnership deployed to: ${val}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});