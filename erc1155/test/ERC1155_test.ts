import { expect } from "chai";
import { ethers } from "hardhat";
import { DatasetOwnership, DatasetTokenERC20 } from "../typechain-types";

describe("DatasetOwnership", function () {
  let datasetOwnership: DatasetOwnership;
  let owner: any, buyer: any;

  beforeEach(async function () {
    [owner, buyer] = await ethers.getSigners();

    const DatasetOwnership = await ethers.getContractFactory("DatasetOwnership");
    datasetOwnership = await DatasetOwnership.deploy("https://example.com/metadata/");
    await datasetOwnership.waitForDeployment();
  });

  it("should mint a dataset token", async function () {
    const tx = await datasetOwnership.mintDatasetToken(10, "https://example.com/dataset1", "DatasetToken", "DTK", ethers.parseEther("1"));
    await tx.wait();

    const tokenOwner = await datasetOwnership.datasetOwners(1);
    expect(tokenOwner).to.equal(owner.address);
  });

  it("should allow a buyer to purchase partial ownership", async function () {
    await datasetOwnership.mintDatasetToken(10, "https://example.com/dataset1", "DatasetToken", "DTK", ethers.parseEther("1"));
    await expect(
      datasetOwnership.connect(buyer).buyPartialOwnership(1, 3600, { value: ethers.parseEther("1") })
    ).to.changeEtherBalances([owner, buyer], [ethers.parseEther("1"), ethers.parseEther("-1")]);
  });

  it("should burn expired ownership", async function () {
    await datasetOwnership.mintDatasetToken(10, "https://example.com/dataset1", "DatasetToken", "DTK", ethers.parseEther("1"));
    await datasetOwnership.burnExpiredOwnership(1, owner.address, 5);
  });

  it("should return dataset token balance after purchase", async function () {
    await datasetOwnership.mintDatasetToken(10, "https://example.com/dataset1", "DatasetToken", "DTK", ethers.parseEther("1"));
    await datasetOwnership.connect(buyer).buyPartialOwnership(1, 3600, { value: ethers.parseEther("1") });
    const balance = await datasetOwnership.getBalance(1, buyer.address);
    expect(balance).to.be.gt(0);
  });

  it("should return dataset URI if buyer has enough ERC20 tokens", async function () {
    await datasetOwnership.mintDatasetToken(10, "https://example.com/dataset1", "DatasetToken", "DTK", ethers.parseEther("1"));
    await datasetOwnership.connect(buyer).buyPartialOwnership(1, 3600, { value: ethers.parseEther("1") });
    const uri = await datasetOwnership.getDatasetUri(1, buyer.address);
    
    expect(uri).to.equal("https://example.com/dataset1");
  });
});
