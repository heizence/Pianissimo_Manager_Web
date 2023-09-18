import React, { useState, useEffect } from "react";
import "./index.css";
import API from "../../../modules/APIs";
import { checkEmail } from "../../../modules/utils";

const ReissuePassword = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log(`\n# reissuePassword`);
    return () => {};
  }, []);

  // 입력창 입력 내용 체크
  const checkForms = () => {
    if (!email) {
      alert("이메일을 입력해 주세요.");
    } else if (!checkEmail(email)) {
      alert("올바른 형식의 이메일을 입력해 주세요.");
    } else {
      reissuePasswordRequest();
    }
  };

  // 아이디(이메일) 찾기 요청
  const reissuePasswordRequest = async () => {
    try {
      // 추후 기능 구현 예정
      const res = await API.managerReissuePassword({
        email: email,
      });
      console.log("reissuePassword response : ", res);

      if (res.statusCode === 200) {
        alert("해당 이메일로 임시 비밀번호가 전송되었습니다.");
      } else if (res.statusCode === 404) {
        alert("해당 아이디로 가입된 계정이 없습니다.");
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("reissuePassword error : ", error);
    }
  };

  return (
    <div id="reissuePassword_container">
      <div>
        <h1 id="reissuePassword_header">비밀번호 재발급</h1>

        <div>
          <span className="reissuePassword_inputLabel">아이디(이메일)</span>
          <input
            className="reissuePassword_input"
            type="text"
            placeholder="아이디(이메일) 입력"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <button id="reissuePassword_reissuePasswordBtn" onClick={checkForms}>
          비밀번호 전송
        </button>
      </div>
    </div>
  );
};

export default ReissuePassword;
