pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 {

    //  struct Coordinator {
    //     string ra;
    //     string dec;
    //     string mag;
    //     string cot;
    // }

    struct Star {
        string name;
        string story;
        string ra;
        string dec;
        string mag;
        string cent;
        // mapping(string => Coordinator) coor;

    }


    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;
    mapping(bytes32 => bool) public coordHash;

    // modifier uniquenessCheck(string _ra, string _dec, string _mag, string _cent) {

    // }

    function generateCoordsHash(string _ra, string _dec, string _mag, string _cent) public pure returns(bytes32){
        return keccak256(abi.encodePacked(_ra, _dec, _mag, _cent));
    }

    function isEmpty(string _val) public pure returns(bool){
        return keccak256(abi.encodePacked(_val)) == keccak256(abi.encodePacked(""));
    }

    function checkIfStarExist(string _ra, string _dec, string _mag, string _cent)
        public
        view
        returns(bool){
        return coordHash[generateCoordsHash(_ra, _dec, _mag, _cent)];
    }

    function createStar(string _name, string _story, string _ra, string _dec, string _mag, string _cent, uint256 _tokenId) public {
        require(_tokenId != 0, "tokenId can not be 0");
        require(!isEmpty(_ra) || !isEmpty(_dec) || !isEmpty(_mag) || !isEmpty(_cent), "ra, dec, mag can not be empty");

        require(!checkIfStarExist(_ra, _dec, _mag, _cent), "This star aready registered");

        Star memory newStar = Star({name:_name, story: _story, ra: _ra, dec: _dec, mag: _mag, cent: _cent});

        tokenIdToStarInfo[_tokenId] = newStar;

        coordHash[generateCoordsHash(_ra, _dec, _mag, _cent)] = true;

        _mint(msg.sender, _tokenId);


    }

    function mint(uint256 tokenId) public {
        _mint(msg.sender, tokenId);
    }


    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(this.ownerOf(_tokenId) == msg.sender);

        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable {
        require(starsForSale[_tokenId] > 0);

        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);

        starOwner.transfer(starCost);

        if(msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
    }
}