import React from "react";

const PageButtons = ({
  baseURLProps,
  pageIndex = 0, // 데이터를 불러오기 위한 page index. page number 하고는 다름.
  dataCounts,
}) => {
  /********************************* 페이징 시 필요한 변수 설정 ********************************/
  const baseURL = baseURLProps; // 요청 기본 URL
  //const numberOfData = 100; // 데이터 총 갯수
  const numberOfPages = Math.ceil(dataCounts / 10); // 페이지 총 갯수

  let previousBtnClass; // 이전 버튼(<) 스타일 지정을 위한 className
  let nextBtnClass; // 다음 버튼(>) 스타일 지정을 위한 className

  // pageIndex 값에 따라 이전, 다음 버튼 className 설정

  // 1번 페이지(첫 페이지)일 때
  if (pageIndex === 0) {
    previousBtnClass = "page-number-disabled";
    // 전체 페이지 수가 1개일 때
    if (numberOfPages === 1) {
      nextBtnClass = "page-number-disabled";
    } else {
      nextBtnClass = "page-number";
    }
  }
  // 마지막 페이지일 때
  else if (pageIndex === numberOfPages - 1) {
    previousBtnClass = "page-number";
    nextBtnClass = "page-number-disabled";
  }
  // 그 외 페이지일 때
  else {
    previousBtnClass = "page-number";
    nextBtnClass = "page-number";
  }

  /* 이전, 다음 버튼에 적용할 링크 변수들
  previousPageNumber : 현재 페이지 기준 이전 페이지 숫자
  nextPageNumber : 현재 페이지 기준 다음 페이지 숫자. Number 는 절대적인 숫자, index는 0보다 시작하는 값이므로 +1을 추가로 더 해줘야 함.
  previousBtnLink : 현재 페이지 기준 이전(<) 버튼에 적용해 줄 링크 주소
  */
  let previousPageNumber = pageIndex;
  let nextPageNumber = pageIndex + 2;
  let previousBtnLink;

  if (pageIndex === 1) previousBtnLink = `${baseURL}`;
  else previousBtnLink = `${baseURL}?page=${previousPageNumber}`;

  /* 페이지 버튼 랜더링 시작 범위 설정
  indexOfPageIndex : pageIndex 를 10개 단위로 나눈 index 값. 0부터 시작
  firstPageNumber : 페이지 버튼 랜더링 시작 범위
  lastPageNumber : 페이지 버튼 랜더링 끝 범위
  */
  let indexOfPageIndex = Math.floor(pageIndex / 10);
  let firstPageNumber = indexOfPageIndex * 10 + 1;
  let lastPageNumber;

  if (numberOfPages > firstPageNumber + 9) {
    lastPageNumber = firstPageNumber + 9;
  } else {
    lastPageNumber = numberOfPages;
  }
  // console.log("pageIndex : ", pageIndex);
  // console.log("indexOfPageIndex : ", indexOfPageIndex);
  // console.log("firstPageNumber : ", firstPageNumber);
  // console.log("lastPageNumber : ", lastPageNumber);

  /********************************************************************************/

  // CSS styles
  const styles = {
    "page-number-disabled": {
      marginRight: "10px",
      padding: "7px",
      fontSize: "17px",
      textDecoration: "none",
      pointerEvents: "none",
      color: "rgb(199, 199, 199)",
    },
    "page-number": {
      marginRight: "10px",
      padding: "7px",
      fontSize: "17px",
      color: "black",
      textDecoration: "none",
    },
    "number-selected": {
      color: "blue",
      fontWeight: "bold",
    },
  };

  // 이전(<), 다음(>) 버튼을 제외한 중간 페이지 숫자 버튼 랜더링
  const renderPageNumberBtns = () => {
    let idName; // 각 버튼 id 이름
    let className = "page-number"; // 각 버튼 클래스 이름
    if (pageIndex === 0) idName = "number-selected";
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
          let urlToApply = `${baseURL}?page=${pageNumber}`; // 적용해 줄 링크 url
          if (pageNumber === 1) urlToApply = `${baseURL}`; // 1번 페이지는 page 숫자 표시 안 함
          if (pageNumber === pageIndex + 1) idName = "number-selected";
          else idName = "";
          return (
            <a
              key={index}
              style={{
                ...styles[className],
                ...styles[idName],
              }}
              href={`${urlToApply}`}
            >
              {pageNumber}
            </a>
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
      <a
        style={{
          ...styles[previousBtnClass],
        }}
        href={previousBtnLink}
      >
        {"<"}
      </a>
      {renderPageNumberBtns()}
      {/* 다음(>) 버튼 */}
      <a
        style={{
          ...styles[nextBtnClass],
        }}
        href={`${baseURL}?page=${nextPageNumber}`}
      >
        {">"}
      </a>
    </div>
  );
};

export default PageButtons;
