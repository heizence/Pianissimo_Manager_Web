import React, { useState, useEffect } from "react";
import "./index.css";
import API from "../../../modules/APIs";
import {
  checkEmail,
  checkPhoneNumber,
  sha256Hash,
} from "../../../modules/utils";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    console.log(`\n# Signup`);
    return () => {};
  }, []);

  // 입력창 입력 내용 체크
  const checkForms = () => {
    if (!email) {
      alert("이메일을 입력해 주세요.");
    } else if (!checkEmail(email)) {
      alert("올바른 형식의 이메일을 입력해 주세요.");
    } else if (!phoneNumber) {
      alert("전화번호를 입력해 주세요.");
    } else if (!checkPhoneNumber(phoneNumber)) {
      alert("올바른 형식의 전화번호를 입력해 주세요.");
    } else if (!password) {
      alert("비밀번호를 입력해 주세요.");
    } else if (!passwordConfirm) {
      alert("비밀번호 확인을 입력해 주세요.");
    } else if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      SignupRequest();
    }
  };

  // 회원가입 요청
  const SignupRequest = async () => {
    try {
      const res = await API.managerSignup({
        email,
        password: sha256Hash(password),
        phoneNumber,
      });
      console.log("Signup response : ", res);

      if (res.statusCode === 200) {
        alert("회원가입이 완료되었습니다.");
        window.location.href = "/";
      } else if (res.statusCode === 404) {
        alert("관리자 계정은 1개로 제한하므로 추가로 가입할 수 없습니다.");
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.log("Signup error : ", error);
    }
  };

  return (
    <div id="signup_container">
      <div>
        <h1 id="signup_header">회원가입</h1>
        {/******************* 로그인 영역 ******************/}
        <div>
          <span className="signup_inputLabel">아이디(이메일)</span>
          <input
            className="signup_input"
            type="email"
            placeholder="아이디(이메일) 입력"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <span className="signup_inputLabel">전화번호</span>
          <input
            className="signup_input"
            type="text"
            placeholder="전화번호 입력"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>
        <div>
          <span className="signup_inputLabel">비밀번호</span>
          <input
            className="signup_input"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <span className="signup_inputLabel">비밀번호 확인</span>
          <input
            className="signup_input"
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />
        </div>
        {/******************* 가입 버튼 ******************/}
        <div style={{ width: "100%" }}>
          <button id="signup_signupBtn" onClick={checkForms}>
            가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
