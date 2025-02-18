// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DatasetOwnership is ERC1155 {
    // Tracks expiry time for each buyer's token purchase.
    // buyer address => (token ID => expiry timestamp)
    mapping(address => mapping(uint256 => uint256)) public ownershipExpiry;

    // Mapping from tokenId to dataset URI (link to file)
    mapping(uint256 => string) private _datasetUris;
    
    // Counter for new dataset token IDs.
    uint256 public currentTokenId = 1;

    // Event emitted when partial ownership is minted
    event PartialOwnershipMinted(address indexed buyer, uint256 indexed tokenId, uint256 expiryTime);

    // The base constructor is only used as a fallback (our per-token URI is stored separately).
    constructor(string memory baseUri) ERC1155(baseUri) {}

    /// @notice Seller mints a dataset token with a unique URI.
    /// @param amount Number of tokens (fractions) for this dataset.
    /// @param datasetUri The URI pointing to the dataset file.
    function mintDatasetToken(uint256 amount, string memory datasetUri, string memory _metadata) external  {
         // Store the unique URI for this dataset token.
         _datasetUris[currentTokenId] = datasetUri;
         // Mint the token to the owner.
         bytes memory metadata = bytes(_metadata);
         _mint(msg.sender, currentTokenId, amount, metadata);
         currentTokenId++;
    }

    /// @notice Buyer purchases partial ownership for a fixed duration.
    /// @param tokenId Identifier of the dataset token.
    /// @param duration Duration (in seconds) for which the partial ownership is valid.
    /// @dev Payment and further validation logic should be added as needed.
    function buyPartialOwnership(uint256 tokenId,  uint256 duration) external payable {
         _mint(msg.sender, tokenId, 1, "");
         
         // Set the expiration time for the buyer's ownership of this token.
         ownershipExpiry[msg.sender][tokenId] = block.timestamp + duration;
         emit PartialOwnershipMinted(msg.sender, tokenId, block.timestamp + duration);
    }

    /// @notice Burns the token if its ownership period has expired.
    /// @param tokenId Identifier of the token to be burned.
    /// @param account The account holding the token.
    /// @param amount Number of tokens to burn.
    function burnExpiredOwnership(uint256 tokenId, address account, uint256 amount) external {
         require(block.timestamp > ownershipExpiry[account][tokenId], "Ownership period not expired yet");
         _burn(account, tokenId, amount);
    }

    /// @notice Retrieves the dataset URI only if the caller owns at least one token of that dataset.
    /// @param tokenId Identifier of the dataset token.
    function getDatasetUri(uint256 tokenId) external view returns (string memory) {
         require(balanceOf(msg.sender, tokenId) > 0, "Access denied: you do not own this dataset");
         return _datasetUris[tokenId];
    }
}
