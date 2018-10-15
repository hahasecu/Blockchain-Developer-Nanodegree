pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Compaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[]){
        return deployedCampaigns;
    }

}


contract Compaign {

    // defined a new type
    struct Request {
        string description;
        uint value;
        bool complete;
        address recipient;

        // the yes vote count
        uint approvalCount;
        mapping(address => bool) approvals;

    }

   

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    uint public approversCount;

    // address[] public approvers;
    mapping(address => bool) public approvers;


    // modifier goes before constructor
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) public{
        manager = creator;
        minimumContribution = minimum;
    }

    // function Compaign(uint minimum) public payable{
    //      manager = msg.sender;
    //     minimumContribution = minimum;
    // }


    function contribute() public payable {
        // msg.value in wei
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    // this need to be called from external account => public
    function createRequest(string description, uint value, address recipient) public restricted{
       // all fields has to be supplied as defined at the top

        // we never defined any storage type to hold a signle Request,
        // this new request is in memory
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        // Request(description, value, recipient, false);
        // above line equals the dictionary create, has to follow the same order as that defined in struct
        // Not recommended since it is not flexiable

        requests.push(newRequest);
    }


    function approveRequst(uint index) public {
        Request storage request =  requests[index];

        // check if user donated
        require(approvers[msg.sender]);

        // check if the user already voted
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;

    }

    function finalizeRequest(uint index) public{
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }




}