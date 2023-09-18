import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  KAKAOPAY_API_KEY,
  KAKAOPAY_APPROVAL_URL,
  KAKAOPAY_CANCEL_URL,
  KAKAOPAY_FAIL_URL,
} from "../../modules/secretKeys";
import NavigationTab from "../../modules/NavigationTab";
import FindStudentModal from "./FindStudentModal";
import "./index.css";

const PaymentMain = () => {
  const [StudentName, SetStudentName] = useState(""); // 결제할 원생 이름
  const [StudentId, SetStudentId] = useState(""); // 결제할 원생 고유 id
  const [TicketType, SetTicketType] = useState("연습실");
  const [TicketMonth, SetTicketMonth] = useState(1); // 이용권 개월 수
  const [IsFindStudentModalOpen, SetIsFindStudentModalOpen] = useState(false); // 원생 찾기 모달 열기 여부

  useEffect(() => {
    console.log(`\n# PaymentMain`);
    return () => {};
  }, []);

  // 카카오페이로 이용권 결제 요청
  const PaymentRequest = () => {
    if (!StudentName) {
      alert("원생 이름이 입력되지 않았습니다.");
    } else {
      console.log("\n@@ PaymentRequest");

      const paymentInfo = {
        StudentId,
        TicketType,
        TicketMonth,
      };
      window.localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));

      axios({
        // 프록시에 카카오 도메인을 설정했으므로 결제 준비 url만 주자
        url: "https://kapi.kakao.com/v1/payment/ready",
        // 결제 준비 API는 POST 메소드라고 한다.
        method: "POST",
        headers: {
          // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
          Authorization: KAKAOPAY_API_KEY,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        // 설정한 매개변수들
        params: {
          cid: "TC0ONETIME",
          partner_order_id: "pianissimo_order_id", // 가맹점 주문번호
          partner_user_id: "pianissimo_student_id", // 가맹점 회원 id
          item_name: `Pianissimo ${TicketType} ${TicketMonth}개월 이용권`, // 상품명
          quantity: 1, // 상품 수량
          total_amount: 100000 * TicketMonth, // 상품 총액
          tax_free_amount: 0, // 상품 비과세 금액

          approval_url: `http://${KAKAOPAY_APPROVAL_URL}/kakaopayRedirect/success`, // 결제 성공 시 redirect url
          cancel_url: `http://${KAKAOPAY_CANCEL_URL}/kakaopayRedirect/cancel`, // 결제 취소 시 redirect url
          fail_url: `http://${KAKAOPAY_FAIL_URL}/kakaopayRedirect/fail`, // 결제 실패 시 redirect url
        },
      }).then(
        (response) => {
          // 응답에서 필요한 data만 뽑는다.
          //console.log("\n@@@ kakaopay response : ", response);
          const {
            data: { next_redirect_pc_url, tid },
          } = response;

          //console.log(next_redirect_pc_url);
          //console.log(tid);

          window.location.href = next_redirect_pc_url;
        },
        (error) => console.error("\n@@ kakaopay error : ", error)
      );
    }
  };

  return (
    <div id="PaymentMain_container">
      <NavigationTab />

      {/******************* 강사 정보 입력 영역 ******************/}

      <div id="PaymentMain_inputSection">
        <div>
          <h1 id="PaymentMain_header">학원이용 결제</h1>
          <div className="PaymentMain_eachInputSection">
            <span className="PaymentMain_inputLabel">원생 이름</span>

            <div className="PaymentMain_inputSection">
              <input disabled={true} id="PaymentMain_input" type="text" value={StudentName} />
              <button
                className="PaymentMain_eachBtn"
                onClick={() => {
                  SetIsFindStudentModalOpen(true);
                }}
              >
                찾기
              </button>
            </div>
          </div>

          {/******************* 장르 선택 checkbox ******************/}
          <div className="PaymentMain_eachInputSection">
            <span className="PaymentMain_inputLabel">이용권</span>

            {/* 연습실 이용권 checkbox */}
            <div className="PaymentMain_inputSection" id="PaymentMain_checkboxDiv">
              <div className="PaymentMain_eachCheckbox" onClick={() => SetTicketType("연습실")}>
                <input type="checkbox" checked={TicketType === "연습실"} readOnly />
                <span>연습실 이용권</span>
              </div>
              {/* 레슨 이용권 checkbox */}
              <div className="PaymentMain_eachCheckbox" onClick={() => SetTicketType("레슨")}>
                <input type="checkbox" checked={TicketType === "레슨"} readOnly />
                <span>레슨 이용권</span>
              </div>
            </div>
          </div>

          <div className="PaymentMain_eachInputSection">
            <span className="PaymentMain_inputLabel">이용 개월 수</span>
            <div className="PaymentMain_inputSection">
              <select id="PaymentMain_dropdownBtn" name="months" onChange={(e) => SetTicketMonth(e.target.value)}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((number, index) => (
                  <option key={index} value={number}>
                    {number}개월
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/******************* 결제 진행 버튼 ******************/}
          <button className="PaymentMain_eachBtn" onClick={PaymentRequest}>
            결제 진행
          </button>
        </div>
      </div>
      {/* 원생 찾기 모달 */}
      <FindStudentModal
        isOpen={IsFindStudentModalOpen}
        setIsOpen={SetIsFindStudentModalOpen}
        SetStudentName={SetStudentName} // 원생 이름 설정
        SetStudentId={SetStudentId} // 원생 고유 id 설정
      />
    </div>
  );
};

export default PaymentMain;
