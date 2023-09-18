import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../../modules/APIs";
import { checkPhoneNumber } from "../../../modules/utils";
import NavigationTab from "../../../modules/NavigationTab";
import "./index.css";

const EditInstructor = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    console.log(`\n# EditInstructor`);
    getEachInstructorRequest();
    return () => {};
  }, []);

  // 입력창 입력 내용 체크
  const checkForms = () => {
    if (!name) {
      alert("이름을 입력해 주세요.");
    } else if (!phoneNumber) {
      alert("전화번호를 입력해 주세요.");
    } else if (!checkPhoneNumber(phoneNumber)) {
      alert("올바른 형식의 전화번호를 입력해 주세요.");
    } else {
      EditInstructorRequest();
    }
  };

  const { instructorId } = useParams(); // 공지사항 데이터 고유 id

  // 원생 정보 불러오기 요청
  const getEachInstructorRequest = async () => {
    try {
      const res = await API.getEachInstructor({ instructorId });
      if (res.statusCode === 200) {
        console.log("getEachStudentRequest response : ", res.data);
        const { instructorName, instructorGenre, instructorPhoneNumber } =
          res.data;
        setName(instructorName);
        setGenre(instructorGenre);
        setPhoneNumber(instructorPhoneNumber.split("-").join(""));
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("getEachStudentRequest error : ", error);
    }
  };

  // 원생 정보 수정 요청
  const EditInstructorRequest = async () => {
    try {
      const res = await API.editInstructor({
        instructorId,
        name,
        phoneNumber,
        genre,
      });
      console.log("EditInstructor response : ", res);

      if (res.statusCode === 200) {
        alert("수정이 완료되었습니다.");
        window.location.href = `/eachInstructor/${instructorId}`;
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("EditInstructor error : ", error);
    }
  };

  return (
    <div id="editInstructor_container">
      <NavigationTab />

      {/******************* 강사 정보 수정 영역 ******************/}

      <div id="editInstructor_inputSection">
        <div>
          <h1 id="editInstructor_header">강사 정보 수정</h1>
          <div className="editInstructor_eachInputSection">
            <span className="editInstructor_inputLabel">이름</span>
            <input
              className="editInstructor_input"
              type="text"
              placeholder="이름 입력"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="editInstructor_eachInputSection">
            <span className="editInstructor_inputLabel">전화번호</span>
            <input
              className="editInstructor_input"
              type="text"
              placeholder="전화번호 입력"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>

          {/******************* 장르 선택 checkbox ******************/}
          <div className="editInstructor_eachInputSection">
            <span>장르</span>

            {/* 클래식 checkbox */}
            <div id="editInstructor_checkboxDiv">
              <div
                className="editInstructor_eachCheckbox"
                onClick={() => setGenre("클래식")}
              >
                <input type="checkbox" checked={genre === "클래식"} readOnly />
                <span>클래식</span>
              </div>
              {/* 재즈 checkbox */}
              <div
                className="editInstructor_eachCheckbox"
                onClick={() => setGenre("재즈")}
              >
                <input type="checkbox" checked={genre === "재즈"} readOnly />
                <span>재즈</span>
              </div>
            </div>
          </div>

          {/* 장르 선택 */}

          {/******************* 수정 버튼 ******************/}
          <div id="editInstructor_buttonDiv">
            <button className="editInstructor_eachBtn" onClick={checkForms}>
              완료
            </button>
            <button
              className="editInstructor_eachBtn"
              onClick={() => {
                window.location.href = `/eachInstructor/${instructorId}`;
              }}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInstructor;
