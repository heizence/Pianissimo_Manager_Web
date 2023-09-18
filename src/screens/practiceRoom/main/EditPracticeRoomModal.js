import React, { useState } from "react";
import Modal from "react-modal";
import API from "../../../modules/APIs";
import "./index.css";

const EditPracticeRoomModal = ({ isModalOpen, setIsOpen }) => {
  const [name, setName] = useState(""); // 연습실 이름 상태
  const [practiceRoomId, setPracticeRoomId] = useState(0); // 연습실 고유 id

  const afterOpenModal = () => {
    console.log(`\n# EditPracticeRoomModal : `, isModalOpen);
    const { name, practiceRoomId } = isModalOpen.data;
    setName(name);
    setPracticeRoomId(practiceRoomId);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // 연습실 수정 요청
  const editPracticeRoomRequest = async () => {
    if (!name) alert("연습실 이름을 입력해 주세요.");
    else {
      try {
        const res = await API.editPracticeRoom({ name, practiceRoomId });

        if (res.statusCode === 200) {
          //console.log("editPracticeRoomsRequest response : ", res.data);
          alert("수정되었습니다.");
          closeModal();
          window.location.href = "/practiceRoom";
        } else {
          alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
        }
      } catch (error) {
        console.error("editPracticeRoomsRequest error : ", error);
      }
    }
  };

  return (
    <Modal
      isOpen={isModalOpen.isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={{
        content: {
          margin: "auto auto",
          width: "350px",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      }}
      ariaHideApp={false}
    >
      <div id="PracticeRoomModal_Container">
        <h2>연습실 수정</h2>

        <div id="PracticeRoomModal_inputDiv">
          <span id="PracticeRoomModal_inputLabel">연습실 이름</span>
          <input
            id="PracticeRoomModal_input"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </div>

        {/******************* 버튼 영역 ******************/}
        <div id="PracticeRoomModal_btnDiv">
          <button
            className="PracticeRoomModal_eachBtn"
            onClick={() => {
              closeModal();
            }}
          >
            취소
          </button>
          <button
            className="PracticeRoomModal_eachBtn"
            onClick={editPracticeRoomRequest}
          >
            완료
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditPracticeRoomModal;
