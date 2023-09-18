import React, { useState } from "react";
import Modal from "react-modal";
import DateRangeCalendarModal from "../../../modules/DateRangeCalendarModal";

import API from "../../../modules/APIs";
import "./index.css";
import { koreaDateFormat } from "../../../modules/utils";

const StudentPauseModal = ({ studentId, pauseDayLeft, isOpen, setIsOpen }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // 일시정지 날짜 범위 선택 달력 open 여부
  const [pauseStartDate, setPauseStartDate] = useState(null); // 일시정지 시작 날짜
  const [pauseEndDate, setPauseEndDate] = useState(null); // 일시정지 끝 날짜

  const afterOpenModal = () => {
    console.log(`\n# StudentPauseModal`);

    let today = new Date();
    // 시간이 자정에 가까워지면 날짜가 변경되는 현상 방지
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    setPauseStartDate(new Date(today));
  };

  const closeModal = () => {
    setIsOpen(false);

    setPauseStartDate(new Date());
    setPauseEndDate(null);
  };

  // 원생 학원이용 일시정지 요청
  const studentPauseRequest = async () => {
    if (!pauseStartDate || !pauseEndDate) {
      alert("일시정지 날짜 범위를 선택해 주세요.");
    } else {
      try {
        console.log(
          "\n### check date(studentPauseModal) : ",
          koreaDateFormat(pauseStartDate)
        );
        console.log(
          "###check date(studentPauseModal) : ",
          koreaDateFormat(pauseEndDate)
        );
        const res = await API.studentPause({
          studentId,
          pauseStartDate: koreaDateFormat(pauseStartDate),
          pauseEndDate: koreaDateFormat(pauseEndDate),
        });
        console.log("studentPauseRequest response : ", res.data);
        if (res.statusCode === 200) {
          alert("일시정지 처리되었습니다.");
          closeModal();
          window.location.href = `/eachStudent/${studentId}`;
        } else {
          alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
        }
      } catch (error) {
        console.error("studentPauseRequest error : ", error);
      }
    }
  };

  // 일시정지 날짜 범위 상태 변경
  const setPauseDateRange = (startDate, endDate) => {
    setPauseStartDate(startDate);
    setPauseEndDate(endDate);
    // console.log("startDate: ", startDate.toLocaleDateString("ko"));
    // console.log("endDate: ", endDate.toLocaleDateString("ko"));
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
          minWidth: "500px",
          maxWidth: "800px",
          height: "50%",
        },
      }}
      ariaHideApp={false}
    >
      {/******************* 헤더 영역 ******************/}
      <div id="eachStudent_pause_modal_container">
        <h2>이용 일시정지</h2>
        {/******************* 내용 영역 ******************/}
        <div id="eachStudent_pause_modal_contents">
          <div className="eachStudent_pause_modal_infoDiv">
            <span className="eachStudent_pause_modal_infoKey">
              일시정지 기간
            </span>
            {/* 일시정지 기간 표시 */}
            <span
              className="eachStudent_pause_modal_infoValue"
              id="eachStudent_pause_modal_pauseDateRange"
              onClick={() => setIsCalendarOpen(true)}
            >
              {pauseEndDate
                ? `${pauseStartDate.toLocaleDateString(
                    "ko"
                  )} ~ ${pauseEndDate.toLocaleDateString("ko")}`
                : "날짜를 입력해 주세요."}
            </span>

            {/* 일시정지 기간 날짜 선택 달력 */}
            {isCalendarOpen && (
              <DateRangeCalendarModal
                startDate={pauseStartDate}
                endDate={pauseEndDate}
                setDateRange={setPauseDateRange}
                isOpen={isCalendarOpen}
                setIsOpen={setIsCalendarOpen}
              />
            )}
          </div>
          <div className="eachStudent_pause_modal_infoDiv">
            <span className="eachStudent_pause_modal_infoKey">
              남은 일시정지 일 수
            </span>
            <span className="eachStudent_pause_modal_infoValue">
              {pauseDayLeft} 일
            </span>
          </div>
        </div>
        {/******************* 버튼 영역 ******************/}
        <div id="eachStudent_pause_modal_btnDiv">
          <button
            className="eachStudent_pause_modal_eachBtn"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="eachStudent_pause_modal_eachBtn"
            onClick={studentPauseRequest}
          >
            완료
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StudentPauseModal;
