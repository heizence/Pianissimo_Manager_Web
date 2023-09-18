import React, { useState, useEffect } from "react";
import API from "../../../modules/APIs";
import NavigationTab from "../../../modules/NavigationTab";
import { useParams } from "react-router-dom";
import "./index.css";
import LessonHistoriesModal from "./LessonHistoriesModal";
import PaymentHistoriesModal from "./PaymentHistoriesModal";
import StudentPauseModal from "./StudentPauseModal";

const EachStudent = () => {
  const [data, setData] = useState({});
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false); // 레슨 내역 조회 modal 열기, 닫기 상태
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // 결제내역 조회 modal 열기, 닫기 상태
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false); // 원생 학원이용 일시정지 modal 열기, 닫기 상태

  useEffect(() => {
    console.log(`\n# EachStudent`);
    getEachStudentRequest();

    return () => {};
  }, []);

  const { studentId } = useParams(); // 원생 데이터 고유 id
  //console.log("studentId : ", studentId);

  // 원생 정보 불러오기 요청
  const getEachStudentRequest = async () => {
    try {
      const res = await API.getEachStudent({ studentId });
      if (res.statusCode === 200) {
        console.log("getEachStudentRequest response : ", res.data);
        setData(res.data);
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("getEachStudentRequest error : ", error);
    }
  };

  // 원생 정보 삭제하기 요청
  const deleteStudentRequest = async () => {
    try {
      const res = await API.deleteStudent({ studentId });

      if (res.statusCode === 200) {
        console.log("deleteStudentRequest response : ", res.data);
        alert("삭제되었습니다.");
        window.location.href = "/students";
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("deleteStudentRequest error : ", error);
    }
  };

  // 원생 학원이용 일시정지 해제 요청
  const studentResumeRequest = async () => {
    try {
      const res = await API.studentResume({ studentId });

      if (res.statusCode === 200) {
        console.log("studentResumeRequest response : ", res.data);
        alert("일시정지가 해제되었습니다.");
        window.location.href = `/eachStudent/${studentId}`;
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("studentResumeRequest error : ", error);
    }
  };

  return (
    <div id="eachStudent_container">
      <NavigationTab />
      <div id="eachStudent_infoSection">
        <h1 id="eachStudent_header">원생 정보 조회</h1>
        {/******************* 원생 정보 영역 ******************/}
        <div>
          <div className="eachStudent_eachInfoSection">
            <span className="eachStudent_key">이름</span>
            <span className="eachStudent_value">{data.studentName}</span>
          </div>

          <div className="eachStudent_eachInfoSection">
            <span className="eachStudent_key">아이디</span>
            <span className="eachStudent_value">{data.studentEmail}</span>
          </div>

          <div className="eachStudent_eachInfoSection">
            <span className="eachStudent_key">전화번호</span>
            <span className="eachStudent_value">{data.studentPhoneNumber}</span>
          </div>

          <div className="eachStudent_eachInfoSection">
            <span className="eachStudent_key">등록일</span>
            <span className="eachStudent_value">
              {data.studentRegisteredDate}
            </span>
          </div>

          <div className="eachStudent_eachInfoSection">
            <span className="eachStudent_key">학원 이용여부</span>
            <span className="eachStudent_value">
              {data.studentStatus === "홀딩중"
                ? data.studentStatus +
                  `(${data.studentPauseStartDate} ~ ${data.studentPauseEndDate})`
                : data.studentStatus}
            </span>
          </div>

          <div className="eachStudent_eachInfoSection">
            <span className="eachStudent_key">이용권</span>
            <span className="eachStudent_value">{data.studentTicketType}</span>
          </div>

          <div className="eachStudent_eachInfoSection">
            <span className="eachStudent_key">이용기간</span>
            <span className="eachStudent_value">{data.studentUsageDate}</span>
          </div>

          <div className="eachStudent_eachInfoSection">
            <span className="eachStudent_key">남은 레슨 횟수</span>
            <span className="eachStudent_value">{data.studentLessonsLeft}</span>
          </div>

          <div
            className="eachStudent_eachInfoSection"
            id="eachStudent_eachInfoWithBtn"
          >
            <span className="eachStudent_key">레슨 내역</span>
            <div className="eachStudent_value">
              <button
                className="eachStudent_eachBtn"
                onClick={() => {
                  setIsLessonModalOpen(true);
                }}
              >
                조회
              </button>
            </div>
          </div>

          <div
            className="eachStudent_eachInfoSection"
            id="eachStudent_eachInfoWithBtn"
          >
            <span className="eachStudent_key">결제 내역</span>
            <div className="eachStudent_value">
              <button
                className="eachStudent_eachBtn"
                onClick={() => {
                  setIsPaymentModalOpen(true);
                }}
              >
                조회
              </button>
            </div>
          </div>
        </div>

        {/******************* 기타 버튼 ******************/}
        <div id="eachStudent_buttonDiv">
          <button
            className="eachStudent_eachBtn"
            onClick={() => {
              window.location.href = `/eachStudent/${studentId}/edit`;
            }}
          >
            수정
          </button>
          <button
            className="eachStudent_eachBtn"
            onClick={deleteStudentRequest}
          >
            삭제
          </button>
          {data.studentStatus === "홀딩중" ? (
            <button
              className="eachStudent_eachBtn"
              onClick={studentResumeRequest}
            >
              일시정지 해제
            </button>
          ) : (
            <button
              className="eachStudent_eachBtn"
              onClick={() => {
                if (data.studentTicketType === "결제내역 없음")
                  alert("해당 원생이 보유한 이용권이 없습니다.");
                else setIsPauseModalOpen(true);
                //setIsPauseModalOpen(true);  // for test
              }}
            >
              이용 일시정지
            </button>
          )}
          <button
            className="eachStudent_eachBtn"
            onClick={() => {
              window.location.href = "/students";
            }}
          >
            목록으로
          </button>
        </div>
      </div>

      <LessonHistoriesModal
        studentId={studentId}
        isOpen={isLessonModalOpen}
        setIsOpen={setIsLessonModalOpen}
      />
      <PaymentHistoriesModal
        studentId={studentId}
        isOpen={isPaymentModalOpen}
        setIsOpen={setIsPaymentModalOpen}
      />
      <StudentPauseModal
        studentId={studentId}
        pauseDayLeft={data.studentPauseDayLeft} // 일시정지 남은 일 수
        isOpen={isPauseModalOpen}
        setIsOpen={setIsPauseModalOpen}
      />
    </div>
  );
};

export default EachStudent;
