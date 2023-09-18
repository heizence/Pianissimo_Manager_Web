import React, { useState, useEffect } from "react";
import API from "../../../modules/APIs";
import NavigationTab from "../../../modules/NavigationTab";
import PageButtons from "../../../modules/PageButtons";
import PageButtonsForModals from "../../../modules/PageButtonsForModals";
import AddPracticeRoomModal from "./AddPracticeRoomModal";
import EditPracticeRoomModal from "./EditPracticeRoomModal";
import "./index.css";

const PracticeRoomMain = () => {
  const [data, setData] = useState(0); // 연습실 목록 데이터
  const [pageIndexState, setPageIndexState] = useState(0); // 연습실 목록 데이터 페이징 처리를 위한 page index 상태
  const [dataCounts, setDataCounts] = useState(0); // 연습실 목록 데이터 갯수

  const [nameTofind, setNameTofind] = useState(""); // 검색을 통해서 찾을 연습실 이름
  const [mode, setMode] = useState("N"); // 일반 조회 모드(N), 연습실 찾기 결과 조회 모드(F) 여부

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 연습실 추가 모달 open 여부
  const [isEditModalOpen, setIsEditModalOpen] = useState({
    isOpen: false,
    data: {
      name: "",
      practiceRoomId: "",
    },
  }); // 연습실 수정 모달 open 여부

  useEffect(() => {
    console.log(`\n# PracticeRoomMain`);
    let pageNumberParam = window.location.href.split("?")[1];
    let pageNumber;
    if (pageNumberParam) pageNumber = pageNumberParam.split("=")[1];
    else pageNumber = 1;

    //console.log("pageNumber : ", pageNumber);

    setPageIndexState(pageNumber - 1); // page index 상태 갱신
    getPracticeRoomsRequest(pageNumber - 1);

    return () => {};
  }, []);

  /* 연습실 목록 불러오기
  데이터를 불러올 시작 범위 index(0부터 시작)
  클라이언트(앱, 웹 모두 포함) 측 page 버튼의 index 에 해당함.
  변수명 변경 시 서버 쪽 변수명과 반드시 같이 변경할 것.
  */
  const getPracticeRoomsRequest = async (pageIndex = 0) => {
    try {
      const res = await API.getPracticeRooms({ pageIndex });
      console.log("getPracticeRoomsRequest response : ", res.data);

      if (res.statusCode === 200) {
        setData(res.data.practiceRooms);
        setDataCounts(res.data.counts);
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("getPracticeRoomsRequest error : ", error);
    }
  };

  // 각 연습실 삭제 요청
  const deletePracticeRoomRequest = async (practiceRoomId) => {
    try {
      const res = await API.deletePracticeRoom({ practiceRoomId });

      if (res.statusCode === 200) {
        console.log("deletePracticeRoomRequest response : ", res.data);
        alert("삭제되었습니다.");
        window.location.href = "/practiceRoom";
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("deletePracticeRoomRequest error : ", error);
    }
  };

  // 연습실 찾기 요청
  const findPracticeRoomRequest = async (pageIndex = 0) => {
    if (!nameTofind) {
      alert("연습실 이름을 입력해 주세요.");
      return;
    }

    try {
      const res = await API.findPracticeRoom({
        practiceRoomName: nameTofind,
        pageIndex,
      });
      console.log("findPracticeRoomRequest response : ", res.data);

      if (res.statusCode === 200) {
        setData(res.data.practiceRooms);
        setDataCounts(res.data.counts);
        setMode("F");
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("findPracticeRoomRequest error : ", error);
    }
  };

  return (
    <div id="PracticeRoomMain_container">
      <NavigationTab />
      {/******************* 연습실 목록 컨텐츠 영역 ******************/}
      <div>
        {/******************* 헤더 영역 ******************/}
        <div id="PracticeRoomMain_header">
          <span id="PracticeRoomMain_header_title">연습실 목록</span>
          <div>
            <span id="PracticeRoomMain_header_searchCaption">연습실 찾기</span>
            <input
              id="PracticeRoomMain_header_searchInput"
              placeholder="연습실 이름을 입력하세요"
              value={nameTofind}
              onChange={(event) => setNameTofind(event.target.value)}
            />
            <button
              id="PracticeRoomMain_searchBtn"
              onClick={() => findPracticeRoomRequest()}
            >
              찾기
            </button>
          </div>
        </div>
        <div id="PracticeRoomMain_table">
          {/* 헤더 */}
          <div id="PracticeRoomMain_tableHeader">
            <span
              className="PracticeRoomMain_tableEachBlock"
              id="PracticeRoomMain_eachName"
            >
              연습실 이름
            </span>
            <span
              className="PracticeRoomMain_tableEachBlock"
              id="PracticeRoomMain_eachRegisteredDate"
            >
              추가일
            </span>
            <span
              className="PracticeRoomMain_tableEachBlock"
              id="PracticeRoomMain_buttonArea"
            ></span>
          </div>
          {/* 
          연습실 목록 랜더링
          1.서버로부터 데이터 불러오기. 그 동안은 빈 div 태그 랜더링
          2.불러온 데이터가 존재하면 랜더링 해 주기. 
          3.데이터가 존재하지 않으면 내용없음 텍스트 표시해 주기.
          */}
          {!data ? (
            <div></div>
          ) : data.length ? (
            data.map((each, index) => {
              return (
                <div key={index} id="PracticeRoomMain_tableEachContent">
                  <span
                    className="PracticeRoomMain_tableEachBlock"
                    id="PracticeRoomMain_eachName"
                  >
                    {each.practiceRoomName}
                  </span>

                  <span
                    className="PracticeRoomMain_tableEachBlock"
                    id="PracticeRoomMain_eachRegisteredDate"
                  >
                    {each.practiceRoomRegisteredDate}
                  </span>
                  {/* 연습실 수정, 삭제 버튼 영역 */}
                  <div id="PracticeRoomMain_eachBtnDiv">
                    <button
                      id="PracticeRoomMain_editOrDeleteBtn"
                      onClick={() =>
                        setIsEditModalOpen({
                          isOpen: true,
                          data: {
                            name: each.practiceRoomName,
                            practiceRoomId: each.practiceRoomId,
                          },
                        })
                      }
                    >
                      수정
                    </button>
                    <button
                      id="PracticeRoomMain_editOrDeleteBtn"
                      onClick={() =>
                        deletePracticeRoomRequest(each.practiceRoomId)
                      }
                    >
                      삭제
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div id="PracticeRoomMain_noContents">
              등록된 연습실이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* 연습실 등록 버튼. 일반 조회일 때와 검색 결과 조회일 때 쓰이는 버튼 컴포넌트가 다름 */}
      <div id="PracticeRoomMain_registerBtnDiv">
        {mode === "N" ? (
          <button
            id="PracticeRoomMain_registerBtn"
            onClick={() => {
              setIsAddModalOpen(true);
            }}
          >
            연습실 추가
          </button>
        ) : (
          <button
            id="PracticeRoomMain_registerBtn"
            onClick={() => {
              window.location.href = "/practiceRoom";
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
            baseURLProps={"/practiceRoom"}
            pageIndex={pageIndexState}
            setPageIndexState={setPageIndexState}
            dataCounts={dataCounts}
          />
        ) : (
          <PageButtonsForModals
            requestApi={findPracticeRoomRequest}
            dataCounts={dataCounts}
          />
        ))}

      {/******************* 연습실 등록, 수정 모달 ******************/}
      <AddPracticeRoomModal
        isModalOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
      />
      <EditPracticeRoomModal
        isModalOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      />
    </div>
  );
};

export default PracticeRoomMain;
