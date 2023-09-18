import React, { useState, useEffect } from "react";
import API from "../../../modules/APIs";
import NavigationTab from "../../../modules/NavigationTab";
import "./index.css";

const RegisterNotice = () => {
  const [title, setTitle] = useState(); // 공지사항 제목
  const [contents, setContents] = useState(); // 공지사항 내용

  useEffect(() => {
    console.log(`\n# RegisterNotice`);
    return () => {};
  }, []);

  // 입력창 체크
  const checkForms = () => {
    if (!title) {
      alert("제목을 입력해 주세요.");
    } else if (!contents) {
      alert("내용을 입력해 주세요.");
    } else {
      registerNoticeRequest();
    }
  };

  // 공지사항 등록하기 요청
  const registerNoticeRequest = async () => {
    try {
      const res = await API.registerNotice({ title, contents });

      if (res.statusCode === 200) {
        console.log("registerNoticeRequest response : ", res.data);
        alert("등록되었습니다.");
        window.location.href = "/main";
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("registerNoticeRequest error : ", error);
    }
  };

  /* 데이터를 불러올 시작 범위 index(0부터 시작)
  클라이언트(앱, 웹 모두 포함) 측 page 버튼의 index 에 해당함.
  변수명 변경 시 서버 쪽 변수명과 반드시 같이 변경할 것.
  */

  return (
    <div id="registerNotice_container">
      <div>
        <NavigationTab />
        {/******************* 공지사항 컨텐츠 영역 ******************/}
        <div>
          <input
            id="registerNotice_title_input"
            placeholder="공지사항 제목"
            onChange={(event) => setTitle(event.target.value)}
          ></input>
          <span id="registerNotice_writtenDate">
            {new Date().toLocaleDateString("ko")}
          </span>
          <textarea
            id="registerNotice_contents_textarea"
            placeholder="내용을 입력하세요."
            onChange={(event) => setContents(event.target.value)}
          ></textarea>
        </div>
      </div>
      {/******************* 버튼 영역 ******************/}
      <div id="registerNotice_btnDiv">
        <button
          className="registerNotice_eachBtn"
          id="registerNotice_completeBtn"
          onClick={checkForms}
        >
          완료
        </button>
        <button
          className="registerNotice_eachBtn"
          onClick={() => {
            window.location.href = "/main";
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default RegisterNotice;
