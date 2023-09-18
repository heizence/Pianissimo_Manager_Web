import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../../modules/APIs";
import { checkPhoneNumber } from "../../../modules/utils";
import NavigationTab from "../../../modules/NavigationTab";
import "./index.css";

const EditStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    console.log(`\n# EditStudent`);
    getEachStudentRequest();
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
      EditStudentRequest();
    }
  };

  const { studentId } = useParams(); // 공지사항 데이터 고유 id

  // 원생 정보 불러오기 요청
  const getEachStudentRequest = async () => {
    try {
      const res = await API.getEachStudent({ studentId });
      if (res.statusCode === 200) {
        console.log("getEachStudentRequest response : ", res.data);
        const { studentName, studentEmail, studentPhoneNumber } = res.data;
        setName(studentName);
        setEmail(studentEmail);
        setPhoneNumber(studentPhoneNumber.split("-").join(""));
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("getEachStudentRequest error : ", error);
    }
  };

  // 원생 정보 수정 요청
  const EditStudentRequest = async () => {
    try {
      const res = await API.editStudent({
        studentId,
        name,
        phoneNumber,
      });
      console.log("EditStudent response : ", res);

      if (res.statusCode === 200) {
        alert("수정이 완료되었습니다.");
        window.location.href = `/eachStudent/${studentId}`;
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("EditStudent error : ", error);
    }
  };

  return (
    <div id="editStudent_container">
      <NavigationTab />

      {/******************* 원생 정보 입력 영역 ******************/}

      <div id="editStudent_inputSection">
        <div>
          <h1 id="editStudent_header">원생 정보 수정</h1>
          <div className="editStudent_eachInputSection">
            <span className="editStudent_inputLabel">이름</span>
            <input
              className="editStudent_input"
              type="text"
              placeholder="이름 입력"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="editStudent_eachInputSection">
            <span className="editStudent_inputLabel">아이디</span>
            <input
              className="editStudent_input"
              type="email"
              placeholder="아이디(이메일) 입력"
              disabled={true}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="editStudent_eachInputSection">
            <span className="editStudent_inputLabel">전화번호</span>
            <input
              className="editStudent_input"
              type="text"
              placeholder="전화번호 입력"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>

          {/******************* 가입 버튼 ******************/}
          <div id="editStudent_buttonDiv">
            <button className="editStudent_eachBtn" onClick={checkForms}>
              완료
            </button>
            <button
              className="editStudent_eachBtn"
              onClick={() => {
                window.location.href = `/eachStudent/${studentId}`;
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

export default EditStudent;
