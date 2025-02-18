import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract DatasetTokenERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1000 * 10**18); // Initial supply to contract deployer
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}