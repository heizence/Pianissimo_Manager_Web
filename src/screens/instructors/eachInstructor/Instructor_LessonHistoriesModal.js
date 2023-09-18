import React, { useState } from "react";
import Modal from "react-modal";
import API from "../../../modules/APIs";
import "./index.css";
import PageButtonsForModals from "../../../modules/PageButtonsForModals";

const Instructor_LessonHistoriesModal = ({ isOpen, setIsOpen }) => {
  const [data, setData] = useState(null); // 레슨 내역 데이터
  const [dataCounts, setDataCounts] = useState(0); // 레슨 내역 데이터 갯수

  const afterOpenModal = () => {
    console.log(`\n# LessonHistoriesModal`);
    getLessonHistoriesRequest(0);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  /* 데이터를 불러올 시작 범위 index(0부터 시작)
  클라이언트(앱, 웹 모두 포함) 측 page 버튼의 index 에 해당함.
  변수명 변경 시 서버 쪽 변수명과 반드시 같이 변경할 것.
  */
  const getLessonHistoriesRequest = async (pageIndex = 0) => {
    try {
      const res = await API.getLessonHistories({ pageIndex });
      //console.log("getLessonHistoriesRequest response : ", res.data);

      if (res.statusCode === 200) {
        setData(res.data.lessonHistories);
        setDataCounts(res.data.counts);
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("getLessonHistoriesRequest error : ", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={{
        content: {
          margin: "auto auto",
          width: "50%",
          minWidth: "400px",
          maxWidth: "800px",
          minHeight: "500px",
          height: "50%",
          minHeight: "500px",
          maxHeight: "700px",
        },
      }}
      ariaHideApp={false}
    >
      {/******************* 헤더 영역 ******************/}
      <div className="eachInstructor_modal_header">
        <h2>레슨 내역</h2>
        {/* 닫기 버튼 */}
        <span className="eachInstructor_modal_closeBtn" onClick={closeModal}>
          X
        </span>
      </div>
      <div>
        {/******************* 레슨 내역 컨텐츠 영역 ******************/}
        <div id="eachInstructor_modal_table">
          {/* 헤더 */}
          <div id="eachInstructor_modal_tableHeader">
            <span
              className="eachInstructor_modal_tableEachBlock"
              id="eachInstructor_modal_eachStudentName"
            >
              원생
            </span>
            <span
              className="eachInstructor_modal_tableEachBlock"
              id="eachInstructor_modal_eachLessonDate"
            >
              레슨 날짜
            </span>
            <span
              className="eachInstructor_modal_tableEachBlock"
              id="eachInstructor_modal_eachLessonTime"
            >
              레슨 시간
            </span>
          </div>

          {/* 
          레슨 내역 랜더링
          1.서버로부터 데이터 불러오기. 그 동안은 빈 div 태그 랜더링
          2.불러온 데이터가 존재하면 랜더링 해 주기. 
          3.데이터가 존재하지 않으면 내용없음 텍스트 표시해 주기.
          */}
          {!data ? (
            <div></div>
          ) : data.length ? (
            data.map((each, index) => {
              return (
                <div key={index} id="eachInstructor_modal_tableEachContent">
                  <span
                    className="eachInstructor_modal_tableEachBlock"
                    id="eachInstructor_modal_eachStudentName"
                  >
                    {each.studentName}
                  </span>
                  <span
                    className="eachInstructor_modal_tableEachBlock"
                    id="eachInstructor_modal_eachLessonDate"
                  >
                    {each.lessonDate}
                  </span>
                  <span
                    className="eachInstructor_modal_tableEachBlock"
                    id="eachInstructor_modal_eachLessonTime"
                  >
                    {each.lessonTime}
                  </span>
                </div>
              );
            })
          ) : (
            <div id="eachInstructor_modal_noContents">
              레슨 내역이 없습니다.
            </div>
          )}
        </div>
      </div>
      {/* 페이지 버튼 */}
      {dataCounts > 0 && (
        <PageButtonsForModals
          requestApi={getLessonHistoriesRequest}
          dataCounts={dataCounts}
        />
      )}
    </Modal>
  );
};

export default Instructor_LessonHistoriesModal;
