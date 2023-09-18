import React, { useState } from "react";

const PageButtonsForModals = ({ requestApi, dataCounts }) => {
  const [pageIndexState, setPageIndexState] = useState(0); // 레슨 내역 데이터 페이징 처리를 위한 page index 상태

  /********************************* 페이징 시 필요한 변수 설정 ********************************/
  const numberOfPages = Math.ceil(dataCounts / 10); // 페이지 총 갯수

  let previousBtnClass; // 이전 버튼(<) 스타일 지정을 위한 className
  let nextBtnClass; // 다음 버튼(>) 스타일 지정을 위한 className

  // pageIndexState 값에 따라 이전, 다음 버튼 className 설정

  // 1번 페이지(첫 페이지)일 때
  if (pageIndexState === 0) {
    previousBtnClass = "page-number-disabled";
    // 전체 페이지 수가 1개일 때
    if (numberOfPages === 1) {
      nextBtnClass = "page-number-disabled";
    } else {
      nextBtnClass = "page-number";
    }
  }
  // 마지막 페이지일 때
  else if (pageIndexState === numberOfPages - 1) {
    previousBtnClass = "page-number";
    nextBtnClass = "page-number-disabled";
  }
  // 그 외 페이지일 때
  else {
    previousBtnClass = "page-number";
    nextBtnClass = "page-number";
  }

  /* 이전, 다음 버튼 클릭 시 실행할 매서드에 파라미터로 전달해 주는 index 값 설정
  previousPageIndex : 현재 index 기준 이전 index 숫자
  nextPageIndex : 현재 index 기준 다음 index 숫자. 
  */

  let previousPageIndex;
  if (pageIndexState === 0) previousPageIndex = 0;
  else previousPageIndex = pageIndexState - 1;

  let nextPageIndex = pageIndexState + 1;

  /* 페이지 버튼 랜더링 시작 범위 설정
  indexOfPageIndex : pageIndex 를 10개 단위로 나눈 index 값. 0부터 시작
  firstPageNumber : 페이지 버튼 랜더링 시작 범위
  lastPageNumber : 페이지 버튼 랜더링 끝 범위
  */
  let indexOfPageIndex = Math.floor(pageIndexState / 10);
  let firstPageNumber = indexOfPageIndex * 10 + 1;
  let lastPageNumber;

  if (numberOfPages > firstPageNumber + 9) {
    lastPageNumber = firstPageNumber + 9;
  } else {
    lastPageNumber = numberOfPages;
  }

  /********************************************************************************/

  // CSS styles
  const styles = {
    "page-number-disabled": {
      marginRight: "10px",
      padding: "7px",
      fontSize: "15px",
      textDecoration: "none",
      pointerEvents: "none",
      color: "rgb(199, 199, 199)",
    },
    "page-number": {
      marginRight: "7px",
      padding: "7px",
      fontSize: "15px",
      color: "black",
      textDecoration: "none",
      cursor: "pointer",
    },
    "number-selected": {
      color: "blue",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  // 이전(<), 다음(>) 버튼을 제외한 중간 페이지 숫자 버튼 랜더링
  const renderPageNumberBtns = () => {
    let idName; // 각 버튼 id 이름
    let className = "page-number"; // 각 버튼 클래스 이름
    if (pageIndexState === 0) idName = "number-selected";
    else idName = "";

    // 페이지 버튼 랜더링에 쓰일 배열
    let numberOfPagesArr = [];

    for (let i = firstPageNumber; i <= lastPageNumber; i++) {
      numberOfPagesArr.push(i);
    }
    //console.log("nubmerOfPagesArr : ", numberOfPagesArr);

    return (
      <>
        {/* 페이지 숫자 버튼 */}
        {numberOfPagesArr.map((pageNumber, index) => {
          let requestIndex = pageNumber - 1; // 페이지 버튼 클릭 시 실행할 매서드의 파라미터 index

          if (pageNumber === 1) requestIndex = 0; // 1번 페이지는 page 숫자 표시 안 함
          if (pageNumber === pageIndexState + 1) idName = "number-selected";
          else idName = "";
          return (
            <span
              key={index}
              style={{
                ...styles[className],
                ...styles[idName],
              }}
              onClick={() => {
                requestApi(requestIndex);
                setPageIndexState(requestIndex);
              }}
            >
              {pageNumber}
            </span>
          );
        })}
      </>
    );
  };

  return (
    <div
      style={{
        margin: "20px 0px",
        textAlign: "center",
      }}
    >
      {/* 이전(<) 버튼 */}
      <span
        style={{
          ...styles[previousBtnClass],
        }}
        onClick={() => {
          console.log("previous! : ", previousPageIndex);
          requestApi(previousPageIndex);
          setPageIndexState(previousPageIndex);
        }}
      >
        {"<"}
      </span>
      {renderPageNumberBtns()}
      {/* 다음(>) 버튼 */}
      <span
        style={{
          ...styles[nextBtnClass],
        }}
        onClick={() => {
          requestApi(nextPageIndex);
          setPageIndexState(nextPageIndex);
        }}
      >
        {">"}
      </span>
    </div>
  );
};

export default PageButtonsForModals;
