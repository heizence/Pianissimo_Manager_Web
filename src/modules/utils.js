import { sha256 } from "js-sha256";

// 이메일 형식 확인
export const checkEmail = (email) => {
  if (email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
    return true;
  }
  return false;
};

// 전화번호 형식 확인
export const checkPhoneNumber = (number) => {
  if (number.match(/^[0-9]{3}[0-9]{4}[0-9]{4}$/)) {
    return true;
  }
  return false;
};

// sha 256 해싱 처리
export const sha256Hash = (data) => {
  let hash = sha256.hex(data);
  return hash;
};

// 날짜 변환기(YYYY-MM-DD 형식)
export const koreaDateFormat = (val, format) => {
  let ddd = val;
  if (String(val).indexOf("-") >= 0) {
    ddd = ddd.replace(/-/gi, "/");
  }
  let date = new Date(ddd);

  let years = date.getFullYear();
  let Month = date.getMonth() + 1;
  if (Month < 10) {
    Month = "0" + Month;
  }
  let days = date.getDate();
  if (days < 10) {
    days = "0" + days;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  if (format === undefined) {
    return years + "-" + Month + "-" + days;
  } else {
    return years + "-" + Month + "-" + days + " " + hour + ":" + min;
  }
};

/* 
특정 날짜가 포함된 주의 월요일 날짜 찾기
dateString 은 "YYYY-MM-DD" 형식의 string. 
예) 2023-02-10
dateString 이 없으면 현재 날짜 기준으로 조회.
*/
export const getStartDateOfWeek = (dateString = new Date()) => {
  // URL 에서 시작 날짜 파라미터 추출
  const today = new Date(dateString);
  const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay();
  const monday = new Date(today);
  const sunday = new Date(today);
  monday.setDate(today.getDate() - dayOfWeek + 1); // Adjust for Monday of the current week
  sunday.setDate(today.getDate() - dayOfWeek + 7); // Adjust for Monday of the current week
  const startDate = koreaDateFormat(new Date(monday));

  return startDate;
};
