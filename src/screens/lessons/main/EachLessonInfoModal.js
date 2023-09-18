import React, { useState } from "react";
import Modal from "react-modal";
import API from "../../../modules/APIs";
import { getStartDateOfWeek } from "../../../modules/utils";
import "./index.css";

const EachLessonInfoModal = ({ isModalOpen, setIsOpen }) => {
  const afterOpenModal = () => {
    console.log(`\n# EachLessonInfoModal : `, isModalOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { date, instructors, startTime } = isModalOpen.data;

  // 레슨 삭제하기
  const deleteLessonRequest = async () => {
    try {
      const res = await API.deleteLesson({
        blockId: `${date}&${startTime}`,
      });

      if (res.statusCode === 200) {
        //console.log("deleteLessonRequest response : ", res.data);
        alert("삭제되었습니다.");
        window.location.href = `/lessons?startDate=${getStartDateOfWeek(date)}`;
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("deleteLessonRequest error : ", error);
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
          height: "500px",
        },
      }}
      ariaHideApp={false}
    >
      {/******************* 헤더 영역 ******************/}
      <div id="EachLessonInfoModal_header">
        <h2>레슨 정보</h2>
        {/* 닫기 버튼 */}
        <span id="EachLessonInfoModal_closeBtn" onClick={closeModal}>
          X
        </span>
      </div>

      <div className="EachLessonInfoModal_eachInfoRow">
        <span>날짜</span>
        <span>{date}</span>
      </div>
      <div className="EachLessonInfoModal_eachInfoRow">
        <span>시간</span>
        <span>{`${startTime}:00~${startTime + 1}:00`}</span>
      </div>

      <span>레슨 등록된 강사</span>
      <div id="EachLessonInfoModal_instructorsDiv">
        {instructors.map((each, index) => (
          <button key={index} className="EachLessonInfoModal_eachInstructor">
            {each.split("&")[0].split(" - ")[0]}
          </button>
        ))}
      </div>

      {/******************* 버튼 영역 ******************/}
      <div id="EachLessonInfoModal_btnDiv">
        <button
          className="EachLessonInfoModal_eachBtn"
          onClick={() => {
            closeModal();
            window.location.href = `/editLesson?date=${date}&startTime=${startTime}`;
          }}
        >
          수정
        </button>
        <button
          className="EachLessonInfoModal_eachBtn"
          onClick={deleteLessonRequest}
        >
          삭제
        </button>
      </div>
    </Modal>
  );
};

export default EachLessonInfoModal;
