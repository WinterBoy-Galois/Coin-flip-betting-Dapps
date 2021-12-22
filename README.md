# eth_CoinFlip

# Coin flip betting Dapps

CoinFlip DApp is a decentralized application where a player can bet on the result of a coin flip. In order to achieve almost 100% randomness in the coinflip, the project cooperates with an off-chain oracle, which sends back the result calling a callback function present inside the contract. If the player guess the result, he will get back his bet amount plus an additional same quantity, otherwise the funds will be kept by the contract.


# Set up

- install Truffle. 
```
npm install -g truffle
```

- Make sure to add a new file in the root folder named .secret where you can paste the seed phrase of your metamask wallet

- Register on infura.io to communicate with the oracle.

- Get some Ether for testing your DApp from https://faucet.metamask.io/


# Deploy smart contract

```
truffle migrate --reset --network ropsten
```

# Preview
![Alt text](assets/readmeImage.png?raw=true "Title")

