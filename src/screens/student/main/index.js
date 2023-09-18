import React, { useState, useEffect } from "react";
import API from "../../../modules/APIs";
import NavigationTab from "../../../modules/NavigationTab";
import PageButtons from "../../../modules/PageButtons";
import PageButtonsForModals from "../../../modules/PageButtonsForModals";
import "./index.css";

const StudentMain = () => {
  const [data, setData] = useState(null); // 원생 목록 데이터
  const [pageIndexState, setPageIndexState] = useState(0); // 원생 목록 데이터 페이징 처리를 위한 page index 상태
  const [dataCounts, setDataCounts] = useState(0); // 원생 목록 데이터 갯수

  const [nameTofind, setNameTofind] = useState(""); // 검색을 통해서 찾을 원생 이름
  const [mode, setMode] = useState("N"); // 일반 조회 모드(N), 원생 찾기 결과 조회 모드(F) 여부

  useEffect(() => {
    console.log(`\n# StudentMain`);
    let pageNumberParam = window.location.href.split("?")[1];
    let pageNumber;
    if (pageNumberParam) pageNumber = pageNumberParam.split("=")[1];
    else pageNumber = 1;

    //console.log("pageNumber : ", pageNumber);

    setPageIndexState(pageNumber - 1); // page index 상태 갱신
    getStudentsRequest(pageNumber - 1);
    return () => {};
  }, []);

  /* 데이터를 불러올 시작 범위 index(0부터 시작)
  클라이언트(앱, 웹 모두 포함) 측 page 버튼의 index 에 해당함.
  변수명 변경 시 서버 쪽 변수명과 반드시 같이 변경할 것.
  */
  const getStudentsRequest = async (pageIndex = 0) => {
    try {
      const res = await API.getStudents({ pageIndex });
      //console.log("getStudentsRequest response : ", res.data);

      if (res.statusCode === 200) {
        setData(res.data.students);
        setDataCounts(res.data.counts);
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("getStudentsRequest error : ", error);
    }
  };

  // 원생 찾기 요청
  const findStudentRequest = async (pageIndex = 0) => {
    if (!nameTofind) {
      alert("원생 이름을 입력해 주세요.");
      return;
    }

    try {
      const res = await API.findStudent({
        studentName: nameTofind,
        pageIndex,
      });
      console.log("findStudentRequest response : ", res.data);

      if (res.statusCode === 200) {
        setData(res.data.students);
        setDataCounts(res.data.counts);
        setMode("F");
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("findStudentRequest error : ", error);
    }
  };

  return (
    <div id="studentMain_container">
      <NavigationTab />
      <div>
        {/******************* 헤더 영역 ******************/}
        <div id="studentMain_header">
          <span id="studentMain_header_title">원생 목록</span>
          <div>
            <span id="studentMain_header_searchCaption">원생 찾기</span>
            <input
              id="studentMain_header_searchInput"
              placeholder="원생 이름을 입력하세요"
              value={nameTofind}
              onChange={(event) => setNameTofind(event.target.value)}
            />
            <button
              id="studentMain_header_searchBtn"
              onClick={() => findStudentRequest()}
            >
              찾기
            </button>
          </div>
        </div>
        {/******************* 원생 목록 컨텐츠 영역 ******************/}
        <div id="studentMain_table">
          {/* 헤더 */}
          <div id="studentMain_tableHeader">
            <span
              className="studentMain_tableEachBlock"
              id="studentMain_eachId"
            >
              아이디
            </span>
            <span
              className="studentMain_tableEachBlock"
              id="studentMain_eachName"
            >
              이름
            </span>
            <span
              className="studentMain_tableEachBlock"
              id="studentMain_eachPhoneNum"
            >
              전화번호
            </span>
            <span
              className="studentMain_tableEachBlock"
              id="studentMain_eachStatus"
            >
              학원 이용여부
            </span>
            <span
              className="studentMain_tableEachBlock"
              id="studentMain_eachLessonsLeft"
            >
              남은 레슨 횟수
            </span>
            <span
              className="studentMain_tableEachBlock"
              id="studentMain_eachRegisteredDate"
            >
              등록일
            </span>
          </div>
          {/* 
          원생 목록 랜더링
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
                  id="studentMain_tableEachContent"
                  onClick={() => {
                    window.location.href = `/eachStudent/${each.studentId}`;
                  }}
                >
                  <span
                    className="studentMain_tableEachBlock"
                    id="studentMain_eachId"
                  >
                    {each.studentEmail}
                  </span>
                  <span
                    className="studentMain_tableEachBlock"
                    id="studentMain_eachName"
                  >
                    {each.studentName}
                  </span>
                  <span
                    className="studentMain_tableEachBlock"
                    id="studentMain_eachPhoneNum"
                  >
                    {each.studentPhoneNumber}
                  </span>
                  <span
                    className="studentMain_tableEachBlock"
                    id="studentMain_eachStatus"
                  >
                    {each.studentStatus}
                  </span>
                  <span
                    className="studentMain_tableEachBlock"
                    id="studentMain_eachLessonsLeft"
                  >
                    {each.studentLessonsLeft}
                  </span>
                  <span
                    className="studentMain_tableEachBlock"
                    id="studentMain_eachRegisteredDate"
                  >
                    {each.studentRegisteredDate}
                  </span>
                </div>
              );
            })
          ) : (
            <div id="studentMain_noContents">등록된 원생이 없습니다.</div>
          )}
        </div>
      </div>

      {/* 원생 등록 버튼. 일반 조회일 때와 검색 결과 조회일 때 쓰이는 버튼 컴포넌트가 다름 */}
      <div id="studentMain_registerBtnDiv">
        {mode === "N" ? (
          <button
            id="studentMain_registerBtn"
            onClick={() => {
              window.location.href = "/registerStudent";
            }}
          >
            원생 등록
          </button>
        ) : (
          <button
            id="studentMain_registerBtn"
            onClick={() => {
              window.location.href = "/students";
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
            baseURLProps={"/students"}
            pageIndex={pageIndexState}
            setPageIndexState={setPageIndexState}
            dataCounts={dataCounts}
          />
        ) : (
          <PageButtonsForModals
            requestApi={findStudentRequest}
            dataCounts={dataCounts}
          />
        ))}
    </div>
  );
};

export default StudentMain;
