const initialState = {
    isModalVisible: false,
    functionType: "",
    modalTitle: "", 
    modalHash: "",
}

const modalReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SHOW_MODAL": 
            return {
                isModalVisible: true,
                functionType: action.functionType,
                modalTitle: action.modalTitle, 
                modalHash: action.modalHash,
            }

        case "CLOSE_MODAL": 
            return {
                isModalVisible: false,
                functionType: action.functionType,
                modalTitle: action.modalTitle, 
                modalHash: action.modalHash,
            }

        default:
            return {
                ...state,
            }
    }
}

export default modalReducer;
