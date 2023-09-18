import React, { useState, useEffect } from "react";
import API from "../../../modules/APIs";
import NavigationTab from "../../../modules/NavigationTab";
import PageButtons from "../../../modules/PageButtons";
import PageButtonsForModals from "../../../modules/PageButtonsForModals";
import "./index.css";

const InstructorsMain = () => {
  const [data, setData] = useState(null); // 강사 목록 데이터
  const [pageIndexState, setPageIndexState] = useState(0); // 강사 목록 데이터 페이징 처리를 위한 page index 상태
  const [dataCounts, setDataCounts] = useState(0); // 강사 목록 데이터 갯수

  const [nameTofind, setNameTofind] = useState(""); // 검색을 통해서 찾을 강사 이름
  const [mode, setMode] = useState("N"); // 일반 조회 모드(N), 강사 찾기 결과 조회 모드(F) 여부

  useEffect(() => {
    console.log(`\n# InstructorsMain`);
    let pageNumberParam = window.location.href.split("?")[1];
    let pageNumber;
    if (pageNumberParam) pageNumber = pageNumberParam.split("=")[1];
    else pageNumber = 1;

    //console.log("pageNumber : ", pageNumber);

    setPageIndexState(pageNumber - 1); // page index 상태 갱신
    getInstructorsRequest(pageNumber - 1);

    return () => {};
  }, []);

  /* 데이터를 불러올 시작 범위 index(0부터 시작)
  클라이언트(앱, 웹 모두 포함) 측 page 버튼의 index 에 해당함.
  변수명 변경 시 서버 쪽 변수명과 반드시 같이 변경할 것.
  */
  const getInstructorsRequest = async (pageIndex = 0) => {
    try {
      const res = await API.getInstructors({ pageIndex });
      console.log("getInstructorsRequest response : ", res.data);

      if (res.statusCode === 200) {
        setData(res.data.instructors);
        setDataCounts(res.data.counts);
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("getInstructorsRequest error : ", error);
    }
  };

  // 강사 찾기 요청
  const findInstructorRequest = async (pageIndex = 0) => {
    if (!nameTofind) {
      alert("강사 이름을 입력해 주세요.");
      return;
    }

    try {
      const res = await API.findInstructor({
        instructorName: nameTofind,
        pageIndex,
      });
      console.log("findInstructorRequest response : ", res.data);

      if (res.statusCode === 200) {
        setData(res.data.instructors);
        setDataCounts(res.data.counts);
        setMode("F");
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("findInstructorRequest error : ", error);
    }
  };

  return (
    <div id="instructorsMain_container">
      <NavigationTab />
      {/******************* 강사 목록 컨텐츠 영역 ******************/}
      <div>
        {/******************* 헤더 영역 ******************/}
        <div id="instructorsMain_header">
          <span id="instructorsMain_header_title">강사 목록</span>
          <div>
            <span id="instructorsMain_header_searchCaption">강사 찾기</span>
            <input
              id="instructorsMain_header_searchInput"
              placeholder="강사 이름을 입력하세요"
              value={nameTofind}
              onChange={(event) => setNameTofind(event.target.value)}
            />
            <button
              id="instructorsMain_header_searchBtn"
              onClick={() => findInstructorRequest()}
            >
              찾기
            </button>
          </div>
        </div>
        <div id="instructorsMain_table">
          {/* 헤더 */}
          <div id="instructorsMain_tableHeader">
            <span
              className="instructorsMain_tableEachBlock"
              id="instructorsMain_eachName"
            >
              이름
            </span>
            <span
              className="instructorsMain_tableEachBlock"
              id="instructorsMain_eachPhoneNum"
            >
              전화번호
            </span>
            <span
              className="instructorsMain_tableEachBlock"
              id="instructorsMain_eachGenre"
            >
              장르
            </span>
            <span
              className="instructorsMain_tableEachBlock"
              id="instructorsMain_eachRate"
            >
              평균 평점
            </span>
            <span
              className="instructorsMain_tableEachBlock"
              id="instructorsMain_eachRegisteredDate"
            >
              등록일
            </span>
          </div>
          {/* 
          강사 목록 랜더링
          1.서버로부터 데이터 불러오기. 그 동안은 빈 div 태그 랜더링
          2.불러온 데이터가 존재하면 랜더링 해 주기. 
          3.데이터가 존재하지 않으면 내용없음 텍스트 표시해 주기.
          */}
          {!data ? (
            <div></div>
          ) : data.length ? (
            data.map((each, index) => {
              return (
                <div
                  key={index}
                  id="instructorsMain_tableEachContent"
                  onClick={() => {
                    window.location.href = `/eachInstructor/${each.instructorId}`;
                  }}
                >
                  <span
                    className="instructorsMain_tableEachBlock"
                    id="instructorsMain_eachName"
                  >
                    {each.instructorName}
                  </span>
                  <span
                    className="instructorsMain_tableEachBlock"
                    id="instructorsMain_eachPhoneNum"
                  >
                    {each.instructorPhoneNumber}
                  </span>
                  <span
                    className="instructorsMain_tableEachBlock"
                    id="instructorsMain_eachGenre"
                  >
                    {each.instructorGenre}
                  </span>
                  <span
                    className="instructorsMain_tableEachBlock"
                    id="instructorsMain_eachRate"
                  >
                    {each.instructorRate}
                  </span>
                  <span
                    className="instructorsMain_tableEachBlock"
                    id="instructorsMain_eachRegisteredDate"
                  >
                    {each.instructorRegisteredDate}
                  </span>
                </div>
              );
            })
          ) : (
            <div id="instructorsMain_noContents">등록된 강사가 없습니다.</div>
          )}
        </div>
      </div>

      {/* 강사 등록 버튼. 일반 조회일 때와 검색 결과 조회일 때 쓰이는 버튼 컴포넌트가 다름 */}
      <div id="instructorsMain_registerBtnDiv">
        {mode === "N" ? (
          <button
            id="instructorsMain_registerBtn"
            onClick={() => {
              window.location.href = "/registerInstructor";
            }}
          >
            강사 등록
          </button>
        ) : (
          <button
            id="instructorsMain_registerBtn"
            onClick={() => {
              window.location.href = "/instructors";
            }}
          >
            목록으로
          </button>
        )}
      </div>

      {/* 페이지 버튼. 일반 조회일 때와 검색 결과 조회일 때 쓰이는 버튼 컴포넌트가 다름 */}
      {dataCounts > 0 &&
        (mode === "N" ? (
          <PageButtons
            baseURLProps={"/instructors"}
            pageIndex={pageIndexState}
            setPageIndexState={setPageIndexState}
            dataCounts={dataCounts}
          />
        ) : (
          <PageButtonsForModals
            requestApi={findInstructorRequest}
            dataCounts={dataCounts}
          />
        ))}
    </div>
  );
};

export default InstructorsMain;
