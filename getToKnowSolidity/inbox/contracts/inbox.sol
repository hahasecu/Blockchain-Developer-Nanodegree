pragma solidity ^0.4.17;

contract Inbox {
    //storage var
    string public message;//will create a getter function automatically

    // constructor function, Inbox, exu once
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    // // this function is unnecessary
    // function getMessage() public view returns (string) {
    //     return message;
    // }
}