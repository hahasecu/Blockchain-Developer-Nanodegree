pragma solidity ^0.4.17;

contract Lottery {
    //type visibility name
    address public manager;
    address[] public players;


    // constructor
    constructor() public {
        manager = msg.sender;

    }

    modifier onlyManager(){
        require(msg.sender == manager);
        _;
    }

    function enter() public payable {
        require(msg.value > .001 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        // sha3()
        return uint(keccak256(block.difficulty, now, players));
        // return uint(abi.encodePacked(block.difficulty, now, players));

    }


    // transfer is available on all address
    function pickWinner() public onlyManager{

        uint index = random() % players.length;

        // this => the current contract
        players[index].transfer(this.balance);
        players = new address[](0);// create a new dynamic empty array

    }

    function getPlayers() public view returns (address[]) {
        return players;

    }

}