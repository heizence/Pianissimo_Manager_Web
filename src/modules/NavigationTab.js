import React from "react";
import { getStartDateOfWeek, koreaDateFormat } from "./utils";

const NavigationTab = () => {
  // 로그아웃
  const signout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const eachMenuStyle = {
    marginRight: "25px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <div>
      <h1>Pianissimo 통합관리시스템</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            border: "1px black solid",
            padding: "20px",
          }}
        >
          <a href="/main" style={eachMenuStyle}>
            공지사항
          </a>
          <a href="/students" style={eachMenuStyle}>
            원생 관리
          </a>
          <a href="/instructors" style={eachMenuStyle}>
            강사 관리
          </a>
          <a
            href={`/lessons?startDate=${getStartDateOfWeek()}`}
            style={eachMenuStyle}
          >
            레슨 관리
          </a>
          <a href="/practiceRoom" style={eachMenuStyle}>
            연습실 관리
          </a>
          <a href="/payment" style={eachMenuStyle}>
            학원이용 결제
          </a>
          <a href="/editPassword" style={{ ...eachMenuStyle, marginRight: 0 }}>
            관리자 비밀번호 변경
          </a>
        </div>
        <span style={eachMenuStyle} onClick={signout}>
          로그아웃
        </span>
      </div>
    </div>
  );
};

export default NavigationTab;
