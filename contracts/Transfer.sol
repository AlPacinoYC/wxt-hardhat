// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Transfer {
    // 记录每个地址的余额
    mapping(address => uint256) public balances;
    
    // 转账事件，用于日志记录
    event TransferEvent(address indexed from, address indexed to, uint256 value);
    
    // 存入资金到合约
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    // 从合约转账给其他地址
    function transfer(address payable _to, uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        
        _to.transfer(_amount);
        
        emit TransferEvent(msg.sender, _to, _amount);
    }
    
    // 查询指定地址的余额
    function getBalance(address _address) public view returns (uint256) {
        return balances[_address];
    }
    
    // 查询合约本身的余额
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}