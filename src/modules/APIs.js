import { SERVER_URL } from "./secretKeys";

// HTTP GET 요청
const commonGetAPI = (path, data) => {
  const params = new URLSearchParams();
  for (let key in data) {
    params.append(key, data[key]);
  }

  const requestURL = SERVER_URL + path + ".php?" + params;
  const token = localStorage.getItem("token");

  return fetch(requestURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  })
    .then(async (response) => {
      //console.log("commonGetAPI response : ", response);
      const json = await response.json();
      return json;
    })
    .catch((error) => {
      console.error("commonGetAPI error : ", error);
      alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
    });
};

// HTTP POST 요청
const commonPostAPI = (path, data) => {
  const requestURL = SERVER_URL + path + ".php";
  const token = localStorage.getItem("token");

  return fetch(requestURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      //console.log("commonPostAPI response : ", response);
      const json = await response.json();
      return json;
    })
    .catch((error) => {
      console.error("commonPostAPI error : ", error);
      alert("요청 중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요");
    });
};

const APIs = {
  test1: (data) => commonGetAPI("requestTest", data), // get test
  test2: (data) => commonPostAPI("requestTest", data), // post test

  /******************* 관리자 ******************/
  managerSignin: (data) => commonPostAPI("web/manager/signin", data), // 웹 관리자 로그인
  managerSignup: (data) => commonPostAPI("web/manager/signup", data), // 웹 관리자 회원가입
  managerFindId: (data) => commonPostAPI("web/manager/findId", data), // 웹 관리자 아이디(이메일) 찾기
  managerReissuePassword: (data) => commonPostAPI("web/manager/reissuePassword", data), // 웹 관리자 비밀번호 재발급
  managerEditPassword: (data) => commonPostAPI("web/manager/editPassword", data), // 웹 관리자 비밀번호 변경

  /******************* 공지사항 ******************/
  getNotices: (data) => commonGetAPI("web/notice/getNotices", data), // 공지사항 불러오기
  getEachNotice: (data) => commonGetAPI("web/notice/getEachNotice", data), // 각 공지사항 불러오기
  registerNotice: (data) => commonPostAPI("web/notice/register", data), // 공지사항 등록
  editNotice: (data) => commonPostAPI("web/notice/edit", data), // 공지사항 수정
  deleteNotice: (data) => commonPostAPI("web/notice/delete", data), // 공지사항 삭제

  /******************* 원생 관리 ******************/
  getStudents: (data) => commonGetAPI("web/student/getStudents", data), // 원생 목록 불러오기
  findStudent: (data) => commonGetAPI("web/student/findStudent", data), // 특정 원생 찾기
  getEachStudent: (data) => commonGetAPI("web/student/getEachStudent", data), // 각 원생 정보 불러오기
  registerStudent: (data) => commonPostAPI("web/student/register", data), // 원생 등록(원생용 앱 사용자 회원가입)
  editStudent: (data) => commonPostAPI("web/student/edit", data), // 원생 정보 수정
  deleteStudent: (data) => commonPostAPI("web/student/delete", data), // 원생 정보 삭제
  studentPause: (data) => commonPostAPI("web/student/pause", data), // 원생 학원이용 일시정지 요청
  studentResume: (data) => commonPostAPI("web/student/resume", data), // 원생 학원이용 일시정지 해제 요청

  /******************* 강사 관리 ******************/
  getInstructors: (data) => commonGetAPI("web/instructor/getInstructors", data), // 강사 목록 불러오기
  findInstructor: (data) => commonGetAPI("web/instructor/findInstructor", data), // 특정 강사 찾기
  getEachInstructor: (data) => commonGetAPI("web/instructor/getEachInstructor", data), // 각 강사 정보 불러오기
  registerInstructor: (data) => commonPostAPI("web/instructor/register", data), // 강사 등록
  editInstructor: (data) => commonPostAPI("web/instructor/edit", data), // 강사 정보 수정
  deleteInstructor: (data) => commonPostAPI("web/instructor/delete", data), // 강사 정보 삭제

  /******************* 레슨 내역 조회 ******************/
  getLessonHistories: (data) => commonGetAPI("web/histories/getLessonHistories", data), // 레슨 내역 불러오기
  getPaymentHistories: (data) => commonGetAPI("web/histories/getPaymentHistories", data), // 결제 내역 불러오기
  addPaymentHistory: (data) => commonPostAPI("web/histories/addPaymentHistory", data), // 결제 후 결제내역 추가

  /******************* 등록된 레슨 관리 ******************/
  getRegisteredLesson: (data) => commonGetAPI("web/lesson/getRegisteredLessons", data), // 등록된 레슨 정보 불러오기
  getEachRegisteredLesson: (data) => commonGetAPI("web/lesson/getEachRegisteredLesson", data), // 각 등록된 레슨 정보 불러오기
  getInstructorNames: (data) => commonGetAPI("web/instructor/getInstructorNames", data), // 모든 강사 이름 불러오기
  registerLesson: (data) => commonPostAPI("web/lesson/register", data), // 레슨 등록하기
  editLesson: (data) => commonPostAPI("web/lesson/edit", data), // 레슨 수정하기
  deleteLesson: (data) => commonPostAPI("web/lesson/delete", data), // 레슨 수정하기

  /******************* 연습실 관리 ******************/
  getPracticeRooms: (data) => commonGetAPI("web/practiceRoom/getPracticeRooms", data), // 연습실 목록 불러오기
  findPracticeRoom: (data) => commonGetAPI("web/practiceRoom/findPracticeRoom", data), // 특정 연습실 찾기
  addPracticeRoom: (data) => commonPostAPI("web/practiceRoom/add", data), // 연습실 추가하기
  editPracticeRoom: (data) => commonPostAPI("web/practiceRoom/edit", data), // 연습실 수정하기
  deletePracticeRoom: (data) => commonPostAPI("web/practiceRoom/delete", data), // 연습실 삭제하기
};

export default APIs;
