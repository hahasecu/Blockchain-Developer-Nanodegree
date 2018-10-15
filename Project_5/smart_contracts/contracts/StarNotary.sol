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
        string cot;
        // mapping(string => Coordinator) coor;

    }


    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;

    function createStar(string _name, string _story, string _ra, string _dec, string _mag, string _cot, uint256 _tokenId) public {
        // Coordinator memory newCoor = Coordinator({ra:_ra, dec:_dec, mag:_mag, cot:_cot});
        Star memory newStar = Star({name:_name, story: _story, ra: _ra, dec: _dec, mag: _mag, cot: _cot});
        tokenIdToStarInfo[_tokenId] = newStar;

        _mint(msg.sender, _tokenId);
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