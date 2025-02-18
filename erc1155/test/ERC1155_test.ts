import { ethers } from "hardhat"
import { expect } from "chai"
import { Contract } from "ethers"
import "@nomicfoundation/hardhat-chai-matchers"
import hre from "hardhat";

describe("DatasetOwnership", function () {
  let datasetOwnership: any
  let owner: any
  let buyer: any
  const baseUri = "https://example.com/base/"
  const datasetUri = "https://example.com/dataset1.json"
  const mintAmount = 100
  const purchaseDuration = 3600 // 1 hour in seconds

  beforeEach(async function () {
    const [ownerSigner, buyerSigner] = await hre.ethers.getSigners()
    owner = await ownerSigner.getAddress()
    buyer = await buyerSigner.getAddress()

    const DatasetOwnership = await ethers.getContractFactory("DatasetOwnership")
    datasetOwnership = await DatasetOwnership.deploy(baseUri)
    await datasetOwnership.waitForDeployment()
  })

  it("should allow owner to mint a dataset token with unique URI", async function () {
    await datasetOwnership.mintDatasetToken(mintAmount, datasetUri)

    const balance = await datasetOwnership.balanceOf(owner, 1)
    expect(balance).to.equal(mintAmount)
  })

  it("should allow a buyer to purchase partial ownership and set expiry", async function () {
    await datasetOwnership.mintDatasetToken(mintAmount, datasetUri)

    await datasetOwnership
      .connect(await ethers.getSigner(buyer))
      .buyPartialOwnership(1, purchaseDuration, { value: ethers.parseEther("1") })

    const buyerBalance = await datasetOwnership.balanceOf(buyer, 1)
    expect(buyerBalance).to.equal(1)

    const expiry = await datasetOwnership.ownershipExpiry(buyer, 1)
    const currentBlockNumber = await ethers.provider.getBlockNumber()
    const val = await ethers.provider.getBlock(currentBlockNumber, true)
    let blockTimestamp = val?.timestamp
    console.log(blockTimestamp)

    if (blockTimestamp == undefined) blockTimestamp = 0
    expect(expiry).to.be.closeTo(blockTimestamp + purchaseDuration, 2)

    const uri = await datasetOwnership.connect(await ethers.getSigner(buyer)).getDatasetUri(1)
    expect(uri).to.equal(datasetUri)
  })

  it("should revert getDatasetUri if caller does not own the token", async function () {
    await datasetOwnership.mintDatasetToken(mintAmount, datasetUri)

    await expect(datasetOwnership.connect(await ethers.getSigner(buyer)).getDatasetUri(1)).to.be.revertedWith(
      "Access denied: you do not own this dataset"
    )
  })

  it("should allow burning of expired partial ownership", async function () {
    await datasetOwnership.mintDatasetToken(mintAmount, datasetUri)

    await datasetOwnership
      .connect(await ethers.getSigner(buyer))
      .buyPartialOwnership(1, purchaseDuration, { value: ethers.parseEther("1") })

    let buyerBalance = await datasetOwnership.balanceOf(buyer, 1)
    expect(buyerBalance).to.equal(1)

    await ethers.provider.send("evm_increaseTime", [purchaseDuration + 1])
    await ethers.provider.send("evm_mine", [])

    await datasetOwnership.burnExpiredOwnership(1, buyer, 1)

    buyerBalance = await datasetOwnership.balanceOf(buyer, 1)
    expect(buyerBalance).to.equal(0)
  })
})
