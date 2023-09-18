import React, { useState, useEffect } from "react";
import API from "../../../modules/APIs";
import NavigationTab from "../../../modules/NavigationTab";
import { koreaDateFormat } from "../../../modules/utils";
import EachLessonInfoModal from "./EachLessonInfoModal";
import "./index.css";

const LessonRegisteredMain = () => {
  const [startDate, setStartDate] = useState(null); // 레슨 데이터 조회 시작 날짜
  const [endDate, setEndDate] = useState(null); // 레슨 데이터 조회 끝 날짜
  const [data, setData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    data: {},
  }); // 각 레슨 정보 확인 모달 open 여부

  useEffect(() => {
    console.log(`\n# LessonRegisteredMain`);

    dateInit().then((res) => {
      getRegisteredLessonRequest(res);
    });

    return () => {};
  }, []);

  // 등록된 레슨 현황 데이터 불러오기
  const getRegisteredLessonRequest = async (
    dateParam = startDate,
    endDateParam = endDate
  ) => {
    try {
      const res = await API.getRegisteredLesson({
        startDate: dateParam,
        endDate: endDateParam,
      });
      console.log("getRegisteredLessonRequest response : ", res.data);
      setData(res.data);

      if (res.statusCode === 200) {
      } else {
        alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
      }
    } catch (error) {
      console.error("getRegisteredLessonRequest error : ", error);
    }
  };

  // 시작 날짜 및 끝 날짜 초기 설정. 페이지 진입 시 1번만 실행
  /*
  const dateInit = () => {
    return new Promise((resolve, reject) => {
      const today = new Date();
      const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay();
      const monday = new Date(today);
      const sunday = new Date(today);
      monday.setDate(today.getDate() - dayOfWeek + 1); // Adjust for Monday of the current week
      sunday.setDate(today.getDate() - dayOfWeek + 7); // Adjust for Monday of the current week
      const startDate = koreaDateFormat(new Date(monday));
      const endDate = koreaDateFormat(new Date(sunday));

      setStartDate(startDate);
      setEndDate(endDate);
      resolve(startDate);
    });
  };
  */
  const dateInit = () => {
    return new Promise((resolve, reject) => {
      // URL 에서 시작 날짜 파라미터 추출
      const params = window.location.href.split("?")[1];
      const paramsStartDate = new Date(params.split("=")[1]);

      const dayOfWeek =
        paramsStartDate.getDay() === 0 ? 7 : paramsStartDate.getDay();
      const monday = new Date(paramsStartDate);
      const sunday = new Date(paramsStartDate);
      monday.setDate(paramsStartDate.getDate() - dayOfWeek + 1); // Adjust for Monday of the current week
      sunday.setDate(paramsStartDate.getDate() - dayOfWeek + 7); // Adjust for Monday of the current week
      const startDate = koreaDateFormat(new Date(monday));
      const endDate = koreaDateFormat(new Date(sunday));

      setStartDate(startDate);
      setEndDate(endDate);
      resolve(startDate);
    });
  };

  // 이전 혹은 다음 주 데이터 불러오기
  const getPreviousOrNextWeekData = (isPrevious = true) => {
    const today = new Date(startDate);
    const dateNum = today.getDate();

    // 데이터 조회 시작일 설정
    const weekStartDate = koreaDateFormat(
      today.setDate(isPrevious ? dateNum - 7 : dateNum + 7)
    );
    window.location.href = `lessons?startDate=${weekStartDate}`;
  };

  // 현재 주 각 요일 날짜 string 배열 생성
  const getDatesForCurrentWeek = () => {
    const dayStart = new Date(startDate);
    //const dayStart = new Date("2023-02-20"); // for test

    /*
    보통 첫 주의 시작일은 일요일로 설정되어 있고 dayOfWeek 값은 일요일의 경우 0.
    첫 주의 시작일을 월요일로 설정해 주기 위해 일요일일 경우 dayOfWeek 값을 7로 할당.
    */
    const dayOfWeek = dayStart.getDay() === 0 ? 7 : dayStart.getDay();
    const monday = new Date(dayStart);
    monday.setDate(dayStart.getDate() - dayOfWeek + 1); // Adjust for Monday of the current week

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(koreaDateFormat(date)); // YYYY-MM-DD 형식으로 변환
    }
    return dates;
  };

  const datesForCurrentWeek = getDatesForCurrentWeek();
  //console.log("datesForCurrentWeek : ", datesForCurrentWeek);
  const lessonStartTime = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]; // 레슨 시작 시간 배열

  return (
    <div id="LessonRegisteredMain_container">
      <NavigationTab />
      {/******************* 레슨 컨텐츠 영역 ******************/}

      <table id="LessonRegisteredMain_table">
        {/******************* 요일 표시 ******************/}
        <thead>
          <tr>
            <th className="LessonRegisteredMain_tableEachHeaderBox"></th>
            {/* 공백 생성. 지우지 말 것! */}
            <th className="LessonRegisteredMain_tableEachHeaderBox">월</th>
            <th className="LessonRegisteredMain_tableEachHeaderBox">화</th>
            <th className="LessonRegisteredMain_tableEachHeaderBox">수</th>
            <th className="LessonRegisteredMain_tableEachHeaderBox">목</th>
            <th className="LessonRegisteredMain_tableEachHeaderBox">금</th>
            <th className="LessonRegisteredMain_tableEachHeaderBox">토</th>
            <th className="LessonRegisteredMain_tableEachHeaderBox">일</th>
          </tr>
        </thead>
        {/******************* 레슨 내용 표시 ******************/}
        <tbody>
          {lessonStartTime.map((eachTime, index) => (
            /* 각 줄(row) 랜더링 */
            <tr key={index}>
              <td className="LessonRegisteredMain_tableEachBox">{`${eachTime}:00 ~ ${
                eachTime + 1
              }:00`}</td>
              {/* 이번 주 각 요일에 해당하는 칸 랜더링 */}
              {datesForCurrentWeek.map((date, index2) => {
                // 각 칸에 매칭시켜 줄 데이터 고유 id. DB 테이블에서 정의되는 blockId 와 같아야 됨. 변경 시 같이 변경하기
                const blockId = `${date}&${eachTime}`;
                const hasNoData = data[blockId] === undefined; // 레슨 등록 현황 존재 유무

                /*
                레슨 등록 가능 여부. 다음 3가지 조건이 충족되면 등록 가능하고 파란색 칸으로 스타일 설정.
                레슨 등록 현황 데이터가 없을 때
                현재 날짜보다 해당 칸의 날짜가 더 이후일 때
                현재 시간보다 해당 칸의 시간이 더 이후일 때
                */
                let today = new Date();
                let calendarDay = new Date(date);

                // 현재 날짜(시각 포함)보다 이후 날짜면 true, 이전 날짜면 false
                let isLaterTime =
                  calendarDay.toLocaleDateString("ko") ===
                  today.toLocaleDateString("ko")
                    ? new Date().getHours() < eachTime
                    : today < calendarDay;

                return (
                  <td
                    key={index2}
                    className={
                      isLaterTime
                        ? hasNoData
                          ? "LessonRegisteredMain_tableEachBox_available"
                          : "LessonRegisteredMain_tableEachBox_editable"
                        : "LessonRegisteredMain_tableEachBox"
                    }
                    onClick={
                      isLaterTime
                        ? hasNoData
                          ? () => {
                              console.log("레슨 추가 페이지로 이동!");
                              window.location.href = `/registerLesson?date=${date}&startTime=${eachTime}`;
                            }
                          : () =>
                              setIsModalOpen({
                                isOpen: true,
                                data: {
                                  date,
                                  blockId,
                                  startTime: eachTime,
                                  instructors: data[blockId],
                                },
                              })
                        : undefined
                    }
                  >
                    {/* 날짜 확인 테스트용 */}
                    {/* <span style={{ display: "block" }}>{blockId}</span> */}

                    {/* 등록된 레슨 데이터 랜더링 */}
                    {!hasNoData &&
                      data[blockId].map((lessonData, index3) => {
                        let dataToRender;
                        // 레슨 데이터가 3개 이상일 경우 2개만 표시하고 나머지는 ... 으로 오버플로우 처리
                        if (index3 < 2) dataToRender = lessonData.split("&")[0];
                        else if (index3 === 2) dataToRender = "...";
                        return (
                          <span key={index3} style={{ display: "block" }}>
                            {dataToRender}
                          </span>
                        );
                      })}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/******************* 조회 날짜 선택 버튼 ******************/}
      <div id="LessonRegisteredMain_PageButtonContainer">
        <span
          className="LessonRegisteredMain_PageEachButton"
          onClick={() => getPreviousOrNextWeekData(true)}
        >
          {"<"}
        </span>
        <span id="LessonRegisteredMain_PageButtonDate">
          {startDate && startDate} ~ {endDate && endDate}
        </span>
        <span
          className="LessonRegisteredMain_PageEachButton"
          onClick={() => getPreviousOrNextWeekData(false)}
        >
          {">"}
        </span>
      </div>
      {isModalOpen.isOpen && (
        <EachLessonInfoModal
          isModalOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default LessonRegisteredMain;
