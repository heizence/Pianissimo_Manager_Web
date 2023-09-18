import React, { useState, useEffect } from "react";
import API from "../../../modules/APIs";
import { checkEmail, checkPhoneNumber } from "../../../modules/utils";
import NavigationTab from "../../../modules/NavigationTab";
import "./index.css";

const RegisterStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    console.log(`\n# RegisterStudent`);
    return () => {};
  }, []);

  // 입력창 입력 내용 체크
  const checkForms = () => {
    if (!name) {
      alert("이름을 입력해 주세요.");
    } else if (!email) {
      alert("이메일을 입력해 주세요.");
    } else if (!checkEmail(email)) {
      alert("올바른 형식의 이메일을 입력해 주세요.");
    } else if (!phoneNumber) {
      alert("전화번호를 입력해 주세요.");
    } else if (!checkPhoneNumber(phoneNumber)) {
      alert("올바른 형식의 전화번호를 입력해 주세요.");
    } else {
      RegisterStudentRequest();
    }
  };

  // 회원가입 요청
  const RegisterStudentRequest = async () => {
    try {
      const res = await API.registerStudent({
        name,
        email,
        phoneNumber,
      });
      console.log("RegisterStudent response : ", res);

      if (res.statusCode === 200) {
        alert("등록이 완료되었습니다.");
        window.location = "/students";
      } else if (res.statusCode === 404) {
        alert("이미 가입된 아이디입니다.");
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("RegisterStudent error : ", error);
    }
  };

  // 등록 취소
  const cancel = () => {
    window.location = "/";
  };

  return (
    <div id="registerStudent_container">
      <NavigationTab />

      {/******************* 원생 정보 입력 영역 ******************/}

      <div id="registerStudent_inputSection">
        <div>
          <h1 id="registerStudent_header">원생 정보 등록</h1>
          <div className="registerStudent_eachInputSection">
            <span className="registerStudent_inputLabel">이름</span>
            <input
              className="registerStudent_input"
              type="text"
              placeholder="이름 입력"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="registerStudent_eachInputSection">
            <span className="registerStudent_inputLabel">아이디</span>
            <input
              className="registerStudent_input"
              type="email"
              placeholder="아이디(이메일) 입력"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="registerStudent_eachInputSection">
            <span className="registerStudent_inputLabel">전화번호</span>
            <input
              className="registerStudent_input"
              type="text"
              placeholder="전화번호 입력"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>

          {/******************* 가입 버튼 ******************/}
          <div id="registerStudent_buttonDiv">
            <button className="registerStudent_eachBtn" onClick={checkForms}>
              완료
            </button>
            <button className="registerStudent_eachBtn" onClick={cancel}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
