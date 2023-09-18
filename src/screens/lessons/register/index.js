import React, { useState, useEffect } from "react";
import API from "../../../modules/APIs";
import NavigationTab from "../../../modules/NavigationTab";
import { getStartDateOfWeek } from "../../../modules/utils";
import "./index.css";

const RegisterLesson = () => {
  const [instructorList, setInstructorList] = useState([]); // 강사 목록
  const [selectedInstructors, setSelectedInstructors] = useState([]); // 선택된 강사 모음
  const [params, setParams] = useState({
    date: "",
    startTime: "",
  });

  useEffect(() => {
    getInstructorNames();

    // 파라미터에서 날짜 및 시작 시간 추출
    const params = window.location.href.split("?")[1].split("&");
    const date = params[0].split("=")[1];
    const startTime = params[1].split("=")[1];
    setParams({
      date,
      startTime: Number(startTime),
    });
    return () => {};
  }, []);

  // 강사 추가
  const addInstructor = (instructor) => {
    if (selectedInstructors.indexOf(instructor) === -1) {
      setSelectedInstructors([...selectedInstructors, instructor]);
    } else {
      alert("이미 추가된 상태입니다.");
    }
  };

  // 추가된 강사 삭제
  const removeInstructor = (instructor) => {
    const indexToRemove = selectedInstructors.indexOf(instructor);
    let editedArr = [...selectedInstructors];
    editedArr.splice(indexToRemove, 1);
    setSelectedInstructors([...editedArr]);
  };

  // 강사 전체 목록 불러오기
  const getInstructorNames = async () => {
    try {
      const res = await API.getInstructorNames({});
      console.log("getInstructorNames response : ", res.data);
      setInstructorList(res.data);

      if (res.statusCode === 200) {
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("getInstructorNames error : ", error);
    }
  };

  // 레슨 등록하기
  const registerLessonRequest = async () => {
    if (!selectedInstructors.length) alert("강사를 추가해 주세요.");
    else {
      try {
        const res = await API.registerLesson({
          date: params.date,
          startTime: params.startTime,
          instructors: selectedInstructors,
        });

        if (res.statusCode === 200) {
          console.log("registerLessonRequest response : ", res.data);
          alert("등록되었습니다.");
          window.location.href = `/lessons?startDate=${getStartDateOfWeek(
            params.date
          )}`;
        } else {
          alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
        }
      } catch (error) {
        console.error("registerLessonRequest error : ", error);
      }
    }
  };

  return (
    <div id="RegisterLessonMain_container">
      <NavigationTab />
      {/******************* 레슨 컨텐츠 영역 ******************/}

      <div id="RegisterLessonMain_contents">
        <h2>레슨 등록</h2>
        <span className="RegisterLessonMain_eachInfoRow">
          날짜 : {params.date}
        </span>
        <span className="RegisterLessonMain_eachInfoRow">
          시간 : {`${params.startTime}:00 ~ ${params.startTime + 1}:00`}
        </span>

        <span>강사 추가</span>
        <div id="RegisterLessonMain_addInstructorsBtnDiv">
          {instructorList.map((each, index) => (
            <button
              key={index}
              className="RegisterLessonMain_eachInstructorBtn"
              onClick={() => {
                addInstructor(each);
              }}
            >
              {each.instructorName}
            </button>
          ))}
        </div>

        <div id="RegisterLessonMain_instructorsDiv">
          {selectedInstructors.map((each, index) => (
            <button
              key={index}
              className="RegisterLessonMain_eachInstructorBtn2"
            >
              <div className="RegisterLessonMain_eachInstructorBtn2Div">
                <span className="RegisterLessonMain_eachInstructorBtn2Txt">
                  {each.instructorName}
                </span>
                <span
                  className="RegisterLessonMain_eachInstructorCancelBtn"
                  onClick={() => removeInstructor(each)}
                >
                  X
                </span>
              </div>
            </button>
          ))}
        </div>

        {/******************* 버튼 영역 ******************/}
        <div id="RegisterLessonMain_btnDiv">
          <button
            className="RegisterLessonMain_eachBtn"
            onClick={registerLessonRequest}
          >
            완료
          </button>
          <button
            className="RegisterLessonMain_eachBtn"
            onClick={() => {
              window.location.href = `/lessons?startDate=${getStartDateOfWeek(
                params.date
              )}`;
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterLesson;
