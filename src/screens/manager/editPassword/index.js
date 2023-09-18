import React, { useState, useEffect } from "react";
import "./index.css";
import API from "../../../modules/APIs";
import { sha256Hash } from "../../../modules/utils";
import NavigationTab from "../../../modules/NavigationTab";

const EditPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  useEffect(() => {
    console.log(`\n# EditPassword`);
    return () => {};
  }, []);

  // 입력창 입력 내용 체크
  const checkForms = () => {
    if (!newPassword) {
      alert("새 비밀번호를 입력해 주세요.");
    } else if (!newPasswordConfirm) {
      alert("새 비밀번호 확인을 입력해 주세요.");
    } else if (newPassword !== newPasswordConfirm) {
      alert("새 비밀번호 영역이 일치하지 않습니다.");
    } else {
      EditPasswordRequest();
    }
  };

  // 회원가입 요청
  const EditPasswordRequest = async () => {
    try {
      const res = await API.managerEditPassword({
        newPassword: sha256Hash(newPassword),
      });
      console.log("EditPasswordRequest response : ", res);

      if (res.statusCode === 200) {
        alert("비밀번호가 변경되었습니다.");
        window.location.href = "/";
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.log("EditPasswordRequest error : ", error);
    }
  };

  return (
    <div id="editPassword_container">
      <NavigationTab />

      <div id="editPassword_contents">
        <h1 id="editPassword_header">관리자 비밀번호 변경</h1>
        {/******************* 새 비밀번호 입력 영역 ******************/}
        <div>
          <span className="editPassword_inputLabel">새 비밀번호</span>
          <input
            className="editPassword_input"
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div>
          <span className="editPassword_inputLabel">새 비밀번호 확인</span>
          <input
            className="editPassword_input"
            type="password"
            placeholder="새 비밀번호 확인"
            value={newPasswordConfirm}
            onChange={(event) => setNewPasswordConfirm(event.target.value)}
          />
          {/******************* 비밀번호 변경 버튼 ******************/}
          <div style={{ width: "100%" }}>
            <button id="editPassword_Btn" onClick={checkForms}>
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
