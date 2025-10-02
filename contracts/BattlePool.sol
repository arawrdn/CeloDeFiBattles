// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BattlePool {
    IERC20 public token; // CELO or cUSD
    address public owner;

    struct Battle {
        address player1;
        address player2;
        uint256 stake;
        address winner;
        bool resolved;
    }

    Battle[] public battles;

    constructor(address _token) {
        token = IERC20(_token);
        owner = msg.sender;
    }

    function createBattle(address opponent, uint256 stake) external {
        require(token.transferFrom(msg.sender, address(this), stake), "Transfer failed");
        require(token.transferFrom(opponent, address(this), stake), "Opponent must approve");
        battles.push(Battle(msg.sender, opponent, stake, address(0), false));
    }

    function resolveBattle(uint256 index) external {
        Battle storage b = battles[index];
        require(!b.resolved, "Already resolved");

        uint256 random = uint256(keccak256(abi.encodePacked(blockhash(block.number-1), block.timestamp, b.stake)));
        address winner = random % 2 == 0 ? b.player1 : b.player2;
        b.winner = winner;
        b.resolved = true;

        require(token.transfer(winner, b.stake * 2), "Transfer failed");
    }

    function totalBattles() external view returns (uint256) {
        return battles.length;
    }
}
