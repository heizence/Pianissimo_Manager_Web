import React, { useState } from "react";
import Modal from "react-modal";
import API from "../../modules/APIs";
import "./index.css";
import PageButtonsForModals from "../../modules/PageButtonsForModals";

const FindStudentModal = ({
  isOpen,
  setIsOpen,
  SetStudentName,
  SetStudentId,
}) => {
  const [NameToFind, SetNameToFind] = useState(""); // 찾을 원생 이름
  const [data, setData] = useState(null); // 원생 목록 데이터
  const [dataCounts, setDataCounts] = useState(0); // 원생 목록 데이터 갯수

  const afterOpenModal = () => {
    console.log(`\n# FindStudentModal`);
    setData(null);
    setDataCounts(0);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // 원생 찾기 요청
  const findStudentRequest = async (pageIndex = 0) => {
    if (!NameToFind) {
      alert("원생 이름을 입력해 주세요.");
      return;
    }

    try {
      const res = await API.findStudent({
        studentName: NameToFind,
        pageIndex,
      });
      console.log("findStudentRequest response : ", res.data);

      if (res.statusCode === 200) {
        setData(res.data.students);
        setDataCounts(res.data.counts);
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("findStudentRequest error : ", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={{
        content: {
          margin: "auto auto",
          width: "50%",
          minWidth: "800px",
          maxWidth: "900px",
          height: "600px",
          //   maxHeight: "700px",
        },
      }}
      ariaHideApp={false}
    >
      {/******************* 헤더 영역 ******************/}
      <div id="PaymentMain_modal_header">
        <h2>원생 찾기</h2>
        {/* 닫기 버튼 */}
        <span id="PaymentMain_modal_closeBtn" onClick={closeModal}>
          X
        </span>
      </div>
      {/******************* 원생 찾기 검색창 ******************/}
      <div id="PaymentMain_modal_searchArea">
        <span>원생 이름을 입력하세요</span>
        <div id="PaymentMain_modal_searchInputArea">
          <input
            id="PaymentMain_modal_searchInput"
            placeholder="원생 이름을 입력하세요"
            value={NameToFind}
            onChange={(event) => SetNameToFind(event.target.value)}
          />
          <button
            id="PaymentMain_modal_header_searchBtn"
            onClick={() => findStudentRequest()}
          >
            찾기
          </button>
        </div>
      </div>

      {/******************* 원생 목록 컨텐츠 영역 ******************/}
      {!data ? (
        <div></div>
      ) : (
        <div id="PaymentMain_modal_table">
          {/* 헤더 */}
          <div id="PaymentMain_modal_tableHeader">
            <span
              className="PaymentMain_modal_tableEachBlock"
              id="PaymentMain_modal_eachId"
            >
              아이디
            </span>
            <span
              className="PaymentMain_modal_tableEachBlock"
              id="PaymentMain_modal_eachName"
            >
              이름
            </span>
            <span
              className="PaymentMain_modal_tableEachBlock"
              id="PaymentMain_modal_eachPhoneNum"
            >
              전화번호
            </span>
            <span
              className="PaymentMain_modal_tableEachBlock"
              id="PaymentMain_modal_eachRegisteredDate"
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
          {data.length ? (
            data.map((each, index) => {
              return (
                <div
                  key={index}
                  id="PaymentMain_modal_tableEachContent"
                  onClick={() => {
                    SetStudentName(each.studentName);
                    SetStudentId(each.studentId);
                    console.log("check id : ", each.studentId);
                    closeModal();
                  }}
                >
                  <span
                    className="PaymentMain_modal_tableEachBlock"
                    id="PaymentMain_modal_eachId"
                  >
                    {each.studentEmail}
                  </span>
                  <span
                    className="PaymentMain_modal_tableEachBlock"
                    id="PaymentMain_modal_eachName"
                  >
                    {each.studentName}
                  </span>
                  <span
                    className="PaymentMain_modal_tableEachBlock"
                    id="PaymentMain_modal_eachPhoneNum"
                  >
                    {each.studentPhoneNumber}
                  </span>
                  <span
                    className="PaymentMain_modal_tableEachBlock"
                    id="PaymentMain_modal_eachRegisteredDate"
                  >
                    {each.studentRegisteredDate}
                  </span>
                </div>
              );
            })
          ) : (
            <div id="PaymentMain_modal_noContents">
              해당 이름의 원생이 없습니다.
            </div>
          )}
        </div>
      )}

      {/* 페이지 버튼 */}
      {dataCounts > 0 && (
        <PageButtonsForModals
          requestApi={findStudentRequest}
          dataCounts={dataCounts}
        />
      )}
    </Modal>
  );
};

export default FindStudentModal;
