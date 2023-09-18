import Modal from "react-modal";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ko } from "date-fns/locale";
import { useState } from "react";

const DateRangeCalendarModal = ({
  isOpen,
  setIsOpen,
  startDate, // 날짜 범위 시작 날짜
  endDate, // 날짜 범위 끝 날짜
  setDateRange, // 날짜 범위 선택 매서드
}) => {
  // DateRangeCalendarModal 컴포넌트 내에서 관리하는 날짜 변수들
  const [localStartDate, setLocalStartDate] = useState(startDate); // 날짜 범위 시작일
  const [localEndDate, setLocalEndDate] = useState(
    /* 
    endDate 가 없으면 startDate 도 없음. 모달을 완전 새로 여는 경우에 해당됨
    이 경우, 시작일과 끝 일은 오늘 날짜로 랜더링
    */
    endDate ? endDate : startDate
  ); // 날짜 범위 종료일

  const afterOpenModal = () => {
    //console.log(`\n# DateRangeCalendarModal`);
    console.log(
      "\ncheck start date(DateRangeCalendarModal) : ",
      localStartDate
    );
    console.log("check end date(DateRangeCalendarModal) : ", localEndDate);
  };

  // 달력 모달 닫기
  const closeModal = () => {
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
    setIsOpen(false);
  };

  // 날짜 범위 변경
  const setLocalDateRange = (ranges) => {
    // console.log("ranges: ", ranges.selection);
    const startDateToSet = ranges.selection.startDate;
    const endDateToSet = ranges.selection.endDate;

    // 일시정지 시작일과 만료일 차이 구하기. 일시정지 기간은 1주일(7일)로 제한됨
    const dateGapTimeStamp = endDateToSet.getTime() - startDateToSet.getTime();
    const dayGap = dateGapTimeStamp / 1000 / 60 / 60 / 24; // timestamp 를 일 단위로 환산

    // console.log("dateGapTimeStamp : ", dateGapTimeStamp);
    //console.log("dayGap : ", dayGap);

    // 일시정지 기간은 시작일 당일 포함하여 7일로 제한. dayGap 은 시작일을 제외한 차이
    if (dayGap > 6) {
      alert("이용 정지 기간은 7일 이내로 제한됩니다.");
    } else {
      setLocalStartDate(startDateToSet);
      setLocalEndDate(endDateToSet);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={{
        content: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto auto",
          width: "400px",
          height: "470px",
        },
      }}
      ariaHideApp={false}
    >
      <DateRange
        locale={ko}
        ranges={[
          {
            startDate: localStartDate,
            endDate: localEndDate,
            key: "selection",
          },
        ]}
        onChange={setLocalDateRange}
        showDateDisplay={true}
        minDate={new Date()}
      />
      <div id="eachStudent_pause_modal_btnDiv">
        <button
          className="eachStudent_pause_modal_eachBtn"
          onClick={closeModal}
        >
          취소
        </button>
        <button
          className="eachStudent_pause_modal_eachBtn"
          onClick={() => {
            // 완료 시 선택한 날짜 부모 컴포넌트의 날짜 상태에 반영
            setDateRange(localStartDate, localEndDate);
            closeModal();
          }}
        >
          완료
        </button>
      </div>
    </Modal>
  );
};

export default DateRangeCalendarModal;
