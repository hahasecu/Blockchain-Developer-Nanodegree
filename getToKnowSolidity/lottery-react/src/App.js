import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import web3 from './web3';
import lottery from './lottery';

class App extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { manager: '' };
    // }

    // new way to define a constructor
    state = {
        manager: '',
        players: [],
        balance: '',
        value: '',
        message: ''
    };

    async componentDidMount() {
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);


        this.setState({ manager, players, balance });
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        this.setState({message: 'waiting on transaction success...'})

        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.value,'ether')
        });

        this.setState({message: 'You just entered'});


    }

    render() {
        return (
        <div>
            <h2>Lottery contract</h2>
            <p>The manager of this contract is {this.state.manager}</p>
            <p>Currently there are {this.state.players.length} players </p>
            <p>The total rewards will be {web3.utils.fromWei(this.state.balance, 'ether')} ether</p>

            <hr/>
            <form onSubmit={this.handleSubmit}>
                <h4>Good luck</h4>
                <label>Amount of ether to enter</label>
                <input
                    value={this.state.value}
                    onChange={event => this.setState({value: event.target.value})}
                />
                <button>enter</button>
            </form>
            <hr/>
            
        </div>
        )
    }
}

export default App;
