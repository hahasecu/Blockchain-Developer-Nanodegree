const assert = require('assert');
const ganache = require('ganache-cli');

// Web3 is a constructor, capitalized
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());


class Car {
    park(){
        return 'stopped';
    }

    drive(){
        return 'vroom';
    }
}


describe('Car', () => {
    it('should return a string of stopped', () => {
        const car = new Car();
        assert.equal(car.park(), 'stopped');
    });

    it('should return a string', () => {
        const car = new Car();
        assert.equal(car.drive(), 'vroom');
    })
})