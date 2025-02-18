// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
 import "./DatasetERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract DatasetOwnership is ERC1155 {
    struct DatasetToken {
        DatasetTokenERC20 token;
        string uri;
        uint256 price;
    }

    mapping(uint256 => DatasetToken) public datasetTokens;
    uint256 public currentTokenId = 1;
    mapping(uint256 => address) public datasetOwners;

    event PartialOwnershipPurchased(address indexed buyer, uint256 indexed tokenId, uint256 expiryTime);
    
    constructor(string memory baseUri) ERC1155(baseUri) {}

    function mintDatasetToken(uint256 amount, string memory datasetUri, string memory tokenName, string memory tokenSymbol, uint256 price) external  {
         DatasetTokenERC20 newToken = new DatasetTokenERC20(tokenName, tokenSymbol);
        datasetTokens[currentTokenId] = DatasetToken(newToken, datasetUri, price);
        _mint(msg.sender, currentTokenId, amount, "");
        datasetOwners[currentTokenId] = msg.sender;
        currentTokenId++;
    }

    function buyPartialOwnership(uint256 tokenId, uint256 duration) external payable {
        address owner = datasetOwners[tokenId];
        require(owner != address(0), "Token does not exist");
        DatasetToken storage datasetToken = datasetTokens[tokenId];
        require(msg.value >= datasetToken.price, "Insufficient payment");
        payable(owner).transfer(msg.value);
        require(datasetToken.token.transfer(msg.sender, 10), "ERC20 minting failed");
        emit PartialOwnershipPurchased(msg.sender, tokenId, block.timestamp + duration);
    }

    function burnExpiredOwnership(uint256 tokenId, address account, uint256 amount) external {
        _burn(account, tokenId, amount);
    }

    function getDatasetUri(uint256 tokenId) external view returns (string memory) {
        require(datasetTokens[tokenId].token.balanceOf(msg.sender) >= 10 * 10**18, "Insufficient ERC20 tokens for access");
        return datasetTokens[tokenId].uri;
    }
}