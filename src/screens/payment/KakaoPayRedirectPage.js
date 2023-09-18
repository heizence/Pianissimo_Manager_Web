import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../modules/APIs";

const KakaoPayRedirectPage = () => {
  const [Message, SetMessage] = useState("");
  const { result } = useParams(); // 원생 데이터 고유 id

  useEffect(() => {
    switch (result) {
      case "success":
        const paymentInfo = window.localStorage.getItem("paymentInfo");
        const parsedInfo = JSON.parse(paymentInfo);
        //console.log("check paymentInfo : ", parsedInfo);
        addPaymentHistoryRequest(parsedInfo);
        SetMessage("결제가 완료되었습니다.");
        break;
      case "cancel":
        SetMessage("결제가 취소되었습니다.");
        break;
      case "fail":
        SetMessage("결제 도중 에러가 발생하였습니다.");
        break;
      default:
        break;
    }
    return () => {};
  }, []);

  // 결제 후 결제내역 추가하기
  const addPaymentHistoryRequest = async (data) => {
    console.log("AddPaymentHistoryRequest");
    try {
      const { StudentId, TicketType, TicketMonth } = data;
      const res = await API.addPaymentHistory({
        studentId: StudentId,
        ticketType: TicketType,
        ticketMonth: TicketMonth,
      });

      if (res.statusCode === 200) {
        return true;
        //console.log("addPaymentHistoryRequest response : ", res.data);
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
        return false;
      }
    } catch (error) {
      console.error("addPaymentHistoryRequest error : ", error);
      return false;
    }
  };

  return (
    <div>
      <h2>{Message}</h2>
      <button onClick={() => (window.location.href = "/main")}>
        메인 화면으로 돌아가기
      </button>
    </div>
  );
};

export default KakaoPayRedirectPage;
