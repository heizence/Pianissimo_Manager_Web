import React, { useState, useEffect } from "react";
import API from "../../../modules/APIs";
import NavigationTab from "../../../modules/NavigationTab";
import { useParams } from "react-router-dom";
import "./index.css";
import LessonHistoriesModal from "./Instructor_LessonHistoriesModal";

const EachInstructor = () => {
  const [data, setData] = useState({});
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false); // 레슨 내역 조회 modal 열기, 닫기 상태

  useEffect(() => {
    console.log(`\n# EachInstructor`);
    getEachInstructorRequest();

    return () => {};
  }, []);

  const { instructorId } = useParams(); // 강사 데이터 고유 id
  //console.log("instructorId : ", instructorId);

  // 강사 정보 불러오기 요청
  const getEachInstructorRequest = async () => {
    try {
      const res = await API.getEachInstructor({ instructorId });
      if (res.statusCode === 200) {
        console.log("getEachInstructorRequest response : ", res.data);
        setData(res.data);
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("getEachInstructorRequest error : ", error);
    }
  };

  // 원생 정보 삭제하기 요청
  const deleteInstructorRequest = async () => {
    try {
      const res = await API.deleteInstructor({ instructorId });

      if (res.statusCode === 200) {
        console.log("deleteInstructorRequest response : ", res.data);
        alert("삭제되었습니다.");
        window.location.href = "/instructors";
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("deleteInstructorRequest error : ", error);
    }
  };

  return (
    <div id="eachInstructor_container">
      <NavigationTab />
      <div id="eachInstructor_infoSection">
        <h1 id="eachInstructor_header">강사 정보 조회</h1>
        {/******************* 강사 정보 영역 ******************/}
        <div>
          <div className="eachInstructor_eachInfoSection">
            <span className="eachInstructor_key">이름</span>
            <span className="eachInstructor_value">{data.instructorName}</span>
          </div>

          <div className="eachInstructor_eachInfoSection">
            <span className="eachInstructor_key">전화번호</span>
            <span className="eachInstructor_value">
              {data.instructorPhoneNumber}
            </span>
          </div>

          <div className="eachInstructor_eachInfoSection">
            <span className="eachInstructor_key">등록일</span>
            <span className="eachInstructor_value">
              {data.instructorRegisteredDate}
            </span>
          </div>

          <div className="eachInstructor_eachInfoSection">
            <span className="eachInstructor_key">장르</span>
            <span className="eachInstructor_value">{data.instructorGenre}</span>
          </div>

          <div className="eachInstructor_eachInfoSection">
            <span className="eachInstructor_key">레슨 횟수</span>
            <span className="eachInstructor_value">
              {data.instructorLessonPerformed}
            </span>
          </div>

          <div className="eachInstructor_eachInfoSection">
            <span className="eachInstructor_key">평균 평점</span>
            <span className="eachInstructor_value">{data.instructorRate}</span>
          </div>

          <div
            className="eachInstructor_eachInfoSection"
            id="eachInstructor_eachInfoWithBtn"
          >
            <span className="eachInstructor_key">레슨 내역</span>
            <div className="eachInstructor_value">
              <button
                className="eachInstructor_eachBtn"
                onClick={() => {
                  setIsLessonModalOpen(true);
                }}
              >
                조회
              </button>
            </div>
          </div>

          {/******************* 기타 버튼 ******************/}
          <div id="eachInstructor_buttonDiv">
            <button
              className="eachInstructor_eachBtn"
              onClick={() => {
                window.location.href = `/eachInstructor/${instructorId}/edit`;
              }}
            >
              수정
            </button>
            <button
              className="eachInstructor_eachBtn"
              onClick={deleteInstructorRequest}
            >
              삭제
            </button>
            <button
              className="eachInstructor_eachBtn"
              onClick={() => {
                window.location.href = "/instructors";
              }}
            >
              목록으로
            </button>
          </div>
        </div>
      </div>

      <LessonHistoriesModal
        isOpen={isLessonModalOpen}
        setIsOpen={setIsLessonModalOpen}
      />
    </div>
  );
};

export default EachInstructor;
