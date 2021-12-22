// // SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
pragma solidity 0.5.12;

import "./api/provableAPI_0.5.sol";

contract CoinFlip is usingProvable {
    uint256 public balance;
    uint256 public minimumBetNumber;
    bool public result;

    uint256 constant NUM_RANDOM_BYTES_REQUESTED = 1;
    uint256 public latetstNumber;

    struct Player {
        uint256 balance;
        uint256 betAmount;
        uint256 betChoice;
        bool isWaiting;
    }

    mapping(address => Player) public betters; //to check who's the player
    mapping(bytes32 => address) public pendingBets; //to check who's the sender of a pending bet

    event ClosedBet(
        bytes32 betId,
        address player,
        uint256 choice,
        bool victory,
        uint256 amount
    );

    event WithdrawnFundsFromPlayer(
        address player,
        uint256 amount,
        uint256 contractBalance
    );

    event OccuredDeposit(address, uint256);

    event LogNewProvableQuery(string description, address sender);

    event generateRandomNumber(uint256 randomNumber);

    modifier costsAtLeast {
        require(msg.value >= minimumBetNumber, "Not enough amount");
        _;
    }

    constructor() public payable {
        provable_setProof(proofType_Ledger);
        balance = msg.value;
        minimumBetNumber = 0.01 ether;
    }

    function bet(uint256 _choice) public payable costsAtLeast {
        require(
            msg.value <= balance,
            "Contract has not enough funds to perform this bet"
        );
        require(
            betters[msg.sender].isWaiting == false,
            "This address still has an open bet"
        );
        require(_choice <= 1, "The parameter _choice must be 0 or 1");

        betters[msg.sender].isWaiting = true;
        betters[msg.sender].betAmount = msg.value;
        betters[msg.sender].betChoice = _choice;

        update();
    }

    function update() internal {
        uint256 QUERY_EXECUTION_DELAY = 0;
        uint256 GAS_FOR_CALLBACK = 200000;

        //production mode
        bytes32 queryId =
            provable_newRandomDSQuery(
                QUERY_EXECUTION_DELAY,
                NUM_RANDOM_BYTES_REQUESTED,
                GAS_FOR_CALLBACK
            );

        pendingBets[queryId] = msg.sender;

        emit LogNewProvableQuery(
            "Provable query was sent, standing by for the answer...",
            msg.sender
        );
    }

    function __callback(
        bytes32 _myid,
        string memory _result,
        bytes memory _proof
    ) public {
        require(msg.sender == provable_cbAddress());
        require(
            provable_randomDS_proofVerify__returnCode(
                _myid,
                _result,
                _proof
            ) == 0,
            "Call not coming from the oracle"
        );

        uint256 randomNumber = uint256(keccak256(abi.encodePacked(_result))) % 2;

        result = closedBet(_myid, randomNumber);

        emit generateRandomNumber(randomNumber);
    }

    function closedBet(bytes32 _id, uint256 _result) internal returns (bool) {
        address player = pendingBets[_id];
        bool win = false;

        if(betters[player].betChoice == _result) {
            win = true;
            betters[player].balance += betters[player].betAmount * 2;
            balance -= betters[player].betAmount;
        } else {
            balance += betters[player].betAmount;
        }

        emit ClosedBet(_id, player, betters[player].betChoice, win, betters[player].betAmount);

        betters[player].isWaiting = false;
        delete pendingBets[_id];
        
        return win;
    }

    function getPlayerBalance(address _player) public view returns (uint256) {
        return betters[_player].balance;
    }

    function deposit() public payable returns (uint256) {
        balance += msg.value;

        emit OccuredDeposit(msg.sender, msg.value);

        return msg.value;
    }

    function withdrawFunds() public {
        require(msg.sender != address(0), "not exist address");
        require(betters[msg.sender].balance > 0, "Not enough funds to withdraw");
        require(betters[msg.sender].isWaiting == false, "this address still has an open bet");

        uint256 amount = betters[msg.sender].balance;
        msg.sender.transfer(amount);

        delete (betters[msg.sender]);

        emit WithdrawnFundsFromPlayer(msg.sender, amount, balance);
    }
}
