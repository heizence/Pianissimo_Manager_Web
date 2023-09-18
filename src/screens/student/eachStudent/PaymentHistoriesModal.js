import React, { useState } from "react";
import Modal from "react-modal";
import API from "../../../modules/APIs";
import "./index.css";
import PageButtonsForModals from "../../../modules/PageButtonsForModals";

const PaymentHistoriesModal = ({ studentId, isOpen, setIsOpen }) => {
  const [data, setData] = useState(null); // 레슨 내역 데이터
  const [dataCounts, setDataCounts] = useState(0); // 레슨 내역 데이터 갯수

  const afterOpenModal = () => {
    console.log(`\n# PaymentHistoriesModal`);
    getPaymentHistoriesRequest(0);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  /* 데이터를 불러올 시작 범위 index(0부터 시작)
  클라이언트(앱, 웹 모두 포함) 측 page 버튼의 index 에 해당함.
  변수명 변경 시 서버 쪽 변수명과 반드시 같이 변경할 것.
  */
  const getPaymentHistoriesRequest = async (pageIndex = 0) => {
    try {
      const res = await API.getPaymentHistories({ studentId, pageIndex });
      //console.log("getPaymentHistoriesRequest response : ", res.data);

      if (res.statusCode === 200) {
        setData(res.data.paymentHistories);
        setDataCounts(res.data.counts);
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("getPaymentHistoriesRequest error : ", error);
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
          width: "600px",
          minWidth: "400px",
          maxWidth: "800px",
          height: "50%",
          maxHeight: "700px",
        },
      }}
      ariaHideApp={false}
    >
      {/******************* 헤더 영역 ******************/}
      <div className="eachStudent_modal_header">
        <h2>결제 내역</h2>
        {/* 닫기 버튼 */}
        <span className="eachStudent_modal_closeBtn" onClick={closeModal}>
          X
        </span>
      </div>
      <div>
        {/******************* 레슨 내역 컨텐츠 영역 ******************/}
        <div id="eachStudent_modal_table">
          {/* 헤더 */}
          <div id="eachStudent_modal_tableHeader">
            <span
              className="eachStudent_modal_tableEachBlock"
              id="eachStudent_modal_eachTicketType"
            >
              이용권
            </span>
            <span
              className="eachStudent_modal_tableEachBlock"
              id="eachStudent_modal_eachUsageDate"
            >
              이용 기간
            </span>
            <span
              className="eachStudent_modal_tableEachBlock"
              id="eachStudent_modal_eachIsExpired"
            >
              마감 여부
            </span>
          </div>

          {/* 
          레슨 내역 랜더링
          1.서버로부터 데이터 불러오기. 그 동안은 빈 div 태그 랜더링
          2.불러온 데이터가 존재하면 랜더링 해 주기. 
          3.데이터가 존재하지 않으면 내용없음 텍스트 표시해 주기.
          */}
          {!data ? (
            <div></div>
          ) : data.length ? (
            data.map((each, index) => {
              return (
                <div key={index} id="eachStudent_modal_tableEachContent">
                  <span
                    className="eachStudent_modal_tableEachBlock"
                    id="eachStudent_modal_eachTicketType"
                  >
                    {each.ticketType}
                  </span>
                  <span
                    className="eachStudent_modal_tableEachBlock"
                    id="eachStudent_modal_eachUsageDate"
                  >
                    {each.payedAt} ~ {each.expiresAt}
                  </span>
                  <span
                    className="eachStudent_modal_tableEachBlock"
                    id="eachStudent_modal_eachIsExpired"
                  >
                    {new Date(each.expiresAt).getTime() > new Date().getTime()
                      ? "이용중"
                      : "기간 만료"}
                  </span>
                </div>
              );
            })
          ) : (
            <div id="eachStudent_modal_noContents">결제 내역이 없습니다.</div>
          )}
        </div>
      </div>
      {/* 페이지 버튼 */}
      {dataCounts > 0 && (
        <PageButtonsForModals
          requestApi={getPaymentHistoriesRequest}
          dataCounts={dataCounts}
        />
      )}
    </Modal>
  );
};

export default PaymentHistoriesModal;
