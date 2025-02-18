import { ethers } from "hardhat";

async function main() {
    const baseUri = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.forbes.com%2Fsites%2Fisabelcontreras%2F2021%2F10%2F21%2Fsothebys-makes-first-crypto-investment-backing-nft-startup-using-ethereum-blockchain%2F&psig=AOvVaw2Rilng0S5cUs8UbGs3LEl7&ust=1739964651455000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDfg8uPzYsDFQAAAAAdAAAAABAE"; // Update with actual base URI
    
    console.log("Deploying DatasetOwnership contract...");
    const DatasetOwnership = await ethers.getContractFactory("DatasetOwnership");
    const datasetOwnership = await DatasetOwnership.deploy(baseUri);

    const tokenName = "Ocean";
    const tokenSymbol = "OCN";

    const DatasetERC20Ownership = await ethers.getContractFactory("DatasetTokenERC20");
    const datasetERC20Ownership = await DatasetERC20Ownership.deploy(tokenName, tokenSymbol);
    await datasetOwnership.waitForDeployment();
    await datasetERC20Ownership.waitForDeployment();
    var val = await datasetOwnership.getAddress();
    var val2 = await datasetERC20Ownership.getAddress();

    console.log(DatasetOwnership deployed to: ${val});
    console.log(datasetERC20Ownership deployed to: ${val2});
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});