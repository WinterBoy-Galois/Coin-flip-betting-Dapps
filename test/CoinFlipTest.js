const { isMainThread } = require("worker_threads");

const CoinFlip = artifacts.require("CoinFlip");

contract("CoinFlip", async (accounts) => {
    let instance;
    before(async () => {
        instance = await CoinFlip.deployed();
    });
})

