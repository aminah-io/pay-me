// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "hardhat/console.sol";

contract PayMe is AccessControl {
    uint256 totalMonies;

    address payable public owner;

    event NewPayment(
        address indexed from,
        uint256 timestamp,
        string message,
        string name
    );

    constructor() payable {
        owner = payable(msg.sender);
    }

    struct Payment {
        address payer;
        string message;
        string name;
        uint256 timestamp;
    }

    Payment[] payment;

    function getAllPayments() public view returns (Payment[] memory) {
        return payment;
    }

    function getTotalPayments() public view returns (uint256) {
        console.log("We have %d total payments received", totalMonies);
        return totalMonies;
    }
    
    function payMe(
        string memory _message,
        string memory _name,
        uint256 _payAmount
    ) public payable {
        uint256 minPayment = 0.001 ether;
        require(_payAmount <= minPayment, "Hold on, that's not enough etherMonies!");

        totalMonies += 1;
        console.log("%s has just sent us some monies!", msg.sender);

        payment.push(Payment(msg.sender, _message, _name, block.timestamp));

        (bool success, ) = owner.call{value: _payAmount}("");
        require(success, "Failed to send monies");

        emit NewPayment(msg.sender, block.timestamp, _message, _name);
    }
}
