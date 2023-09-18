import React, { useState, useEffect } from "react";
import API from "../../../modules/APIs";
import { checkPhoneNumber } from "../../../modules/utils";
import NavigationTab from "../../../modules/NavigationTab";
import "./index.css";

const RegisterInstructor = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [genre, setGenre] = useState("클래식");

  useEffect(() => {
    console.log(`\n# RegisterInstructor`);
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
      RegisterInstructorRequest();
    }
  };

  // 강사 등록 요청
  const RegisterInstructorRequest = async () => {
    try {
      const res = await API.registerInstructor({
        name,
        phoneNumber,
        genre,
      });
      console.log("RegisterInstructor response : ", res);

      if (res.statusCode === 200) {
        alert("등록이 완료되었습니다.");
        window.location = "/instructors";
      } else if (res.statusCode === 404) {
        alert(
          "해당 이름으로 등록된 강사가 있습니다. 동명이인 등록 시 이름 뒤에 별도의 식별자를 넣어주세요!\n 예) 홍길동_A"
        );
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("RegisterInstructor error : ", error);
    }
  };

  return (
    <div id="registerInstructor_container">
      <NavigationTab />

      {/******************* 강사 정보 입력 영역 ******************/}

      <div id="registerInstructor_inputSection">
        <div>
          <h1 id="registerInstructor_header">강사 정보 등록</h1>
          <div className="registerInstructor_eachInputSection">
            <span className="registerInstructor_inputLabel">이름</span>
            <input
              className="registerInstructor_input"
              type="text"
              placeholder="이름 입력"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="registerInstructor_eachInputSection">
            <span className="registerInstructor_inputLabel">전화번호</span>
            <input
              className="registerInstructor_input"
              type="text"
              placeholder="전화번호 입력"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>

          {/******************* 장르 선택 checkbox ******************/}
          <div className="registerInstructor_eachInputSection">
            <span>장르</span>

            {/* 클래식 checkbox */}
            <div id="registerInstructor_checkboxDiv">
              <div
                className="registerInstructor_eachCheckbox"
                onClick={() => setGenre("클래식")}
              >
                <input type="checkbox" checked={genre === "클래식"} />
                <span>클래식</span>
              </div>
              {/* 재즈 checkbox */}
              <div
                className="registerInstructor_eachCheckbox"
                onClick={() => setGenre("재즈")}
              >
                <input type="checkbox" checked={genre === "재즈"} />
                <span>재즈</span>
              </div>
            </div>
          </div>

          {/******************* 가입 버튼 ******************/}
          <div id="registerInstructor_buttonDiv">
            <button className="registerInstructor_eachBtn" onClick={checkForms}>
              완료
            </button>
            <button
              className="registerInstructor_eachBtn"
              onClick={() => {
                window.location.href = "/instructors";
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

export default RegisterInstructor;
