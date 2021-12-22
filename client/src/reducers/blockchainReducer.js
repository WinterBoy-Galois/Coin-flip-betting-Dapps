const initialState = {
  contractInstance: {},
  account: "",
  contractBalance: 0,
  gameBalance: 0,
  minimumAmount: 0,
  isLoading: true,
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CONTRACTDATA":
      return {
        ...state,
        contractInstance: action.contractInstance,
        account: action.account,
      };

    case "GET_CONTRACTBALANCE":
      return {
        ...state,
        contractBalance: action.contractBalance,
      };

    case "GET_GAMEBALANCE":
      return {
        ...state,
        gameBalance: action.gameBalance,
      };

    case "GET_MINIAMOUNT":
      return {
        ...state,
        minimumAmount: action.minimumAmount,
        isLoading: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default blockchainReducer;
