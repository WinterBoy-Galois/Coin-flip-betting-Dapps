export const showModal = (functionType, title, hash) => async (dispatch) => {
  dispatch({
    type: "SHOW_MODAL",
    functionType: functionType,
    modalTitle: title,
    modalHash: hash,
  });
};

export const closeModal = () => (dispatch) => {
  dispatch({
    type: "CLOSE_MODAL",
    functionType: "", 
    modalTitle: "", 
    modalHash: ""
  });
};
