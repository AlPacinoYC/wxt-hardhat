// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Transfer {
    mapping(address => uint256) public balances;
    
    event TransferEvent(address indexed from, address indexed to, uint256 value);
    event TransferEvent1(address indexed from);
    
    function deposit() public payable {
        emit TransferEvent1(msg.sender);
        balances[msg.sender] += msg.value;
    }
    
    function transfer(address payable _to, uint256 _amount) public {
        emit TransferEvent1(msg.sender);
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        
        // 注意：这里应该使用 call 而不是 transfer，更安全
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Transfer failed");
        
        emit TransferEvent(msg.sender, _to, _amount);
    }
    
    // 添加 withdraw 函数
    function withdraw(uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        
        balances[msg.sender] -= _amount;
        
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Withdrawal failed");
    }
    
    // 添加完整的余额查询函数
    function getBalance(address _address) public view returns (uint256) {
        return balances[_address];
    }
    
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}