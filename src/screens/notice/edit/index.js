import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../../modules/APIs";
import NavigationTab from "../../../modules/NavigationTab";
import "./index.css";

const EditNotice = () => {
  const [title, setTitle] = useState(""); // 공지사항 제목
  const [contents, setContents] = useState(""); // 공지사항 내용

  useEffect(() => {
    console.log(`\n# EditNotice`);
    getEachNoticeRequest();
    return () => {};
  }, []);

  // 입력창 체크
  const checkForms = () => {
    if (!title) {
      alert("제목을 입력해 주세요.");
    } else if (!contents) {
      alert("내용을 입력해 주세요.");
    } else {
      editNoticeRequest();
    }
  };

  const { noticeId } = useParams(); // 공지사항 데이터 고유 id

  // 공지사항 내용 불러오기 요청
  const getEachNoticeRequest = async () => {
    try {
      const res = await API.getEachNotice({ noticeId });

      if (res.statusCode === 200) {
        //console.log("getEachNoticeRequest response : ", res.data);
        const { noticeTitle, noticeContents } = res.data;
        setTitle(noticeTitle);
        setContents(noticeContents);
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      //console.error("getNoticesRequest error : ", error);
    }
  };

  // 공지사항 수정하기 요청
  const editNoticeRequest = async () => {
    try {
      const res = await API.editNotice({ noticeId, title, contents });

      if (res.statusCode === 200) {
        console.log("editNoticeRequest response : ", res.data);
        alert("수정되었습니다.");
        // 이전에 조회 중이던 공지사항 페이지로 이동
        window.location.href = `/eachNotice/${noticeId}`;
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("editNoticeRequest error : ", error);
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
            type="text"
            placeholder="공지사항 제목"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          ></input>
          <span id="registerNotice_writtenDate">
            {new Date().toLocaleDateString("ko")}
          </span>
          <textarea
            id="registerNotice_contents_textarea"
            placeholder="내용을 입력하세요."
            onChange={(event) => setContents(event.target.value)}
            value={contents}
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
            // 이전에 조회 중이던 공지사항 페이지로 이동
            window.location.href = `/eachNotice/${noticeId}`;
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default EditNotice;
