import React, { useState, useEffect } from "react";
import "./index.css";
import API from "../../../modules/APIs";
import { checkPhoneNumber } from "../../../modules/utils";

const FindId = () => {
  const [phoneNum, setPhoneNum] = useState("");

  useEffect(() => {
    console.log(`\n# FindId`);
    return () => {};
  }, []);

  // 아이디(이메일) 찾기 요청
  const findIdRequest = async () => {
    try {
      if (!checkPhoneNumber(phoneNum)) {
        alert("올바른 형식의 전화번호를 입력해 주세요");
      } else {
        // 추후 기능 구현 예정
        const res = await API.managerFindId({
          phoneNumber: phoneNum,
        });
        console.log("findId response : ", res.data);

        if (res.statusCode === 200) {
          alert("해당 번호로 아이디가 전송되었습니다.");
        } else if (res.statusCode === 404) {
          alert("해당 전화번호로 가입된 계정이 없습니다.");
        } else {
          alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
        }
      }
    } catch (error) {
      console.error("findId error : ", error);
    }
  };

  return (
    <div id="findId_container">
      <div>
        <h1 id="findId_header">아이디 찾기</h1>

        <div>
          <span className="findId_inputLabel">전화번호</span>
          <input
            className="findId_input"
            type="text"
            placeholder="전화번호 입력"
            value={phoneNum}
            onChange={(event) => setPhoneNum(event.target.value)}
          />
        </div>

        <button id="findId_findIdBtn" onClick={findIdRequest}>
          아이디 찾기
        </button>
      </div>
    </div>
  );
};

export default FindId;
