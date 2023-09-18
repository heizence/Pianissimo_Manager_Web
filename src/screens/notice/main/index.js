import React, { useState, useEffect } from "react";
import API from "../../../modules/APIs";
import NavigationTab from "../../../modules/NavigationTab";
import PageButtons from "../../../modules/PageButtons";
import "./index.css";

const NoticeMain = () => {
  const [noticeData, setNoticeData] = useState(null); // 공지사항 데이터
  const [pageIndexState, setPageIndexState] = useState(0); // 공지사항 데이터 페이징 처리를 위한 page index 상태
  const [dataCounts, setDataCounts] = useState(0); // 공지사항 데이터 갯수

  useEffect(() => {
    console.log(`\n# NoticeMain`);
    let pageNumberParam = window.location.href.split("?")[1];
    let pageNumber;
    if (pageNumberParam) pageNumber = pageNumberParam.split("=")[1];
    else pageNumber = 1;
    //console.log("pageNumber : ", pageNumber);

    setPageIndexState(pageNumber - 1); // page index 상태 갱신
    getNoticesRequest(pageNumber - 1);
    return () => {};
  }, []);

  /* 데이터를 불러올 시작 범위 index(0부터 시작)
  클라이언트(앱, 웹 모두 포함) 측 page 버튼의 index 에 해당함.
  변수명 변경 시 서버 쪽 변수명과 반드시 같이 변경할 것.
  */
  const getNoticesRequest = async (pageIndex = 0) => {
    try {
      const res = await API.getNotices({ pageIndex });
      //console.log("getNoticesRequest response : ", res.data);

      if (res.statusCode === 200) {
        setNoticeData(res.data.notices);
        setDataCounts(res.data.counts);
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("getNoticesRequest error : ", error);
    }
  };

  return (
    <div id="noticeMain_container">
      <NavigationTab />
      {/******************* 공지사항 컨텐츠 영역 ******************/}
      <div>
        <h2 id="noticeMain_header">공지사항</h2>
        <div id="noticeMain_table">
          {/* 헤더 */}
          <div id="noticeMain_tableHeader">
            <span
              className="noticeMain_tableEachBlock"
              id="noticeMain_eachTitle"
            >
              제목
            </span>
            <span
              className="noticeMain_tableEachBlock"
              id="noticeMain_eachContents"
            >
              내용
            </span>
            <span
              className="noticeMain_tableEachBlock"
              id="noticeMain_eachWrittenDate"
            >
              등록일
            </span>
          </div>
          {/* 
          공지사항 랜더링
          1.서버로부터 데이터 불러오기. 그 동안은 빈 div 태그 랜더링
          2.불러온 데이터가 존재하면 랜더링 해 주기. 
          3.데이터가 존재하지 않으면 내용없음 텍스트 표시해 주기.
          */}
          {!noticeData ? (
            <div></div>
          ) : noticeData.length ? (
            noticeData.map((each, index) => {
              return (
                <div
                  key={index}
                  id="noticeMain_tableEachContent"
                  onClick={() => {
                    window.location.href = `/eachNotice/${each.noticeId}`;
                  }}
                >
                  <span
                    className="noticeMain_tableEachBlock"
                    id="noticeMain_eachTitle"
                  >
                    {each.noticeTitle}
                  </span>
                  <span
                    className="noticeMain_tableEachBlock"
                    id="noticeMain_eachContents"
                  >
                    {each.noticeContents}
                  </span>
                  <span
                    className="noticeMain_tableEachBlock"
                    id="noticeMain_eachWrittenDate"
                  >
                    {each.noticeWrittenDate}
                  </span>
                </div>
              );
            })
          ) : (
            <div id="noticeMain_noContents">등록된 공지사항이 없습니다.</div>
          )}
        </div>
      </div>

      {/* 공지사항 등록 버튼 */}
      <div id="noticeMain_registerBtnDiv">
        <button
          id="noticeMain_registerBtn"
          onClick={() => {
            window.location.href = "/registerNotice";
          }}
        >
          공지사항 등록
        </button>
      </div>

      {/* 페이지 버튼 */}
      {dataCounts > 0 && (
        <PageButtons
          baseURLProps={"/main"}
          pageIndex={pageIndexState}
          setPageIndexState={setPageIndexState}
          dataCounts={dataCounts}
        />
      )}
    </div>
  );
};

export default NoticeMain;
