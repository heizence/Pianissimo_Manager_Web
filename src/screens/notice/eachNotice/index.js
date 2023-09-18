import React, { useState, useEffect } from "react";
import API from "../../../modules/APIs";
import NavigationTab from "../../../modules/NavigationTab";
import { useParams } from "react-router-dom";
import "./index.css";

const EachNotice = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    console.log(`\n# EachNotice`);
    getEachNoticeRequest();

    return () => {};
  }, []);

  const { noticeId } = useParams(); // 공지사항 데이터 고유 id
  //console.log("noticeId : ", noticeId);

  // 공지사항 내용 불러오기 요청
  const getEachNoticeRequest = async () => {
    try {
      const res = await API.getEachNotice({ noticeId });
      if (res.statusCode === 200) {
        console.log("getEachNoticeRequest response : ", res.data);
        setData(res.data);
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("getNoticesRequest error : ", error);
    }
  };

  // 공지사항 삭제하기 요청
  const deleteNoticeRequest = async () => {
    try {
      const res = await API.deleteNotice({ noticeId });

      if (res.statusCode === 200) {
        console.log("deleteNoticeRequest response : ", res.data);
        alert("삭제되었습니다.");
        window.location.href = "/main";
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("deleteNoticeRequest error : ", error);
    }
  };

  return (
    <div id="eachNotice_container">
      <div>
        <NavigationTab />
        {/******************* 공지사항 컨텐츠 영역 ******************/}
        <div>
          <h2 id="eachNotice_title">{data.noticeTitle}</h2>
          <span className="eachNotice_infoTxt">{data.noticeWriter}</span>
          <span className="eachNotice_infoTxt">{data.noticeWrittenDate}</span>
          <p id="eachNotice_contents">{data.noticeContents}</p>
        </div>
      </div>
      {/******************* 버튼 영역 ******************/}
      <div id="eachNotice_btnDiv">
        <div>
          <button
            className="eachNotice_eachBtn"
            id="eachNotice_editBtn"
            onClick={() => {
              window.location.href = `/eachNotice/${noticeId}/edit`;
            }}
          >
            수정
          </button>
          <button
            className="eachNotice_eachBtn"
            id="eachNotice_deleteBtn"
            onClick={deleteNoticeRequest}
          >
            삭제
          </button>
        </div>
        <button
          className="eachNotice_eachBtn"
          onClick={() => {
            window.location.href = "/main";
          }}
        >
          목록으로
        </button>
      </div>
    </div>
  );
};

export default EachNotice;
