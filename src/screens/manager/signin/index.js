import React, { useState, useEffect } from "react";
import "./index.css";
import API from "../../../modules/APIs";
import { checkEmail, sha256Hash } from "../../../modules/utils";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(`\n# Signin`);
    return () => {};
  }, []);

  // 입력창 입력 내용 체크
  const checkForms = () => {
    if (!email) {
      alert("이메일을 입력해 주세요.");
    } else if (!checkEmail(email)) {
      alert("올바른 형식의 이메일을 입력해 주세요.");
    } else if (!password) {
      alert("비밀번호를 입력해 주세요.");
    } else {
      signinRequest();
    }
  };

  // 로그인 요청
  const signinRequest = async () => {
    try {
      const res = await API.managerSignin({
        email,
        password: sha256Hash(password),
      });
      console.log("signin response : ", res);

      if (res.statusCode === 200) {
        // 응답으로 받은 토큰 localStorage 에 저장해 주기
        localStorage.setItem("token", res.data);
        window.location.href = "/main";
      } else if (res.statusCode === 404) {
        alert("해당 계정이 존재하지 않습니다.");
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("Signin error : ", error);
    }
  };

  return (
    <div id="signin_container">
      <h1 id="signin_header">Pianissimo 통합관리시스템</h1>

      {/******************* 로그인 영역 ******************/}
      <div>
        <span className="signin_inputLabel">아이디(이메일)</span>
        <input
          className="signin_input"
          type="email"
          placeholder="아이디(이메일) 입력"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <span className="signin_inputLabel">비밀번호</span>
        <input
          className="signin_input"
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button id="signin_loginBtn" onClick={checkForms}>
        로그인
      </button>
      {/******************* 회원가입, 아이디 찾기, 비밀번호 재발급 ******************/}
      <div id="signin_otherOptions">
        <a href="/signup" className="signin_option">
          회원가입
        </a>
        <a href="/findId" className="signin_option">
          아이디 찾기
        </a>
        <a href="/reissuePassword" className="signin_option">
          비밀번호를 잊으셨나요?
        </a>
      </div>
    </div>
  );
};

export default Signin;
