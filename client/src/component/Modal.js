import React from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../actions/modalAction";

const DisplayModal = ({ isModalVisible, handleOk}) => {
  const dispatch = useDispatch();
  //data
  const { modalTitle, modalHash } = useSelector((state) => state.modal);

  return (
    <Modal
      title={modalTitle}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={() => dispatch(closeModal())}
      cancelButtonProps={{ disabled: false }}
    >
      {modalHash && (
        <p style={{ color: "black" }}>Transaction Hash: {modalHash}</p>
      )}
    </Modal>
  );
};

export default DisplayModal;
