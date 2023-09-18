import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signup from "../screens/manager/signup";
import FindId from "../screens/manager/findId";
import ReissuePassword from "../screens/manager/reissuePassword";
import EditPassword from "../screens/manager/editPassword";
import NoticeMain from "../screens/notice/main";
import EachNotice from "../screens/notice/eachNotice";
import RegisterNotice from "../screens/notice/register";
import EditNotice from "../screens/notice/edit";
import StudentMain from "../screens/student/main";
import RegisterStudent from "../screens/student/register";
import EachStudent from "../screens/student/eachStudent";
import EditStudent from "../screens/student/edit";
import InstructorsMain from "../screens/instructors/main";
import EachInstructor from "../screens/instructors/eachInstructor";
import EditInstructor from "../screens/instructors/edit";
import RegisterInstructor from "../screens/instructors/register";
import LessonRegisteredMain from "../screens/lessons/main";
import RegisterLesson from "../screens/lessons/register";
import EditLesson from "../screens/lessons/edit";
import { koreaDateFormat } from "./utils";
import PracticeRoomMain from "../screens/practiceRoom/main";
import PaymentMain from "../screens/payment";
import KakaoPayRedirectPage from "../screens/payment/KakaoPayRedirectPage";

const AppRouter = createBrowserRouter([
  // 웹 메인. 토큰 존재 여부에 따라 로그인 화면, 공지사항 메인 화면으로 분리
  {
    path: "/",
    element: <App />,
  },
  /******************* 관리자 관련 ******************/
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/findId",
    element: <FindId />,
  },
  {
    path: "/reissuePassword",
    element: <ReissuePassword />,
  },
  {
    path: "/editPassword",
    element: <EditPassword />,
  },
  /******************* 공지사항 ******************/
  {
    path: "/main",
    element: <NoticeMain />,
  },
  {
    path: "/eachNotice/:noticeId",
    element: <EachNotice />,
  },
  {
    path: "/registerNotice",
    element: <RegisterNotice />,
  },
  {
    path: "/eachNotice/:noticeId/edit",
    element: <EditNotice />,
  },
  /******************* 원생 ******************/
  {
    path: "/students",
    element: <StudentMain />,
  },
  {
    path: "/registerStudent",
    element: <RegisterStudent />,
  },
  {
    path: "/eachStudent/:studentId",
    element: <EachStudent />,
  },
  {
    path: "/eachStudent/:studentId/edit",
    element: <EditStudent />,
  },
  /******************* 강사 ******************/
  {
    path: "/instructors",
    element: <InstructorsMain />,
  },
  {
    path: "/registerInstructor",
    element: <RegisterInstructor />,
  },
  {
    path: "/eachInstructor/:instructorId",
    element: <EachInstructor />,
  },
  {
    path: "/eachInstructor/:instructorId/edit",
    element: <EditInstructor />,
  },
  /******************* 레슨 ******************/
  {
    path: "/lessons",
    element: <LessonRegisteredMain />,
  },
  {
    path: "/registerLesson",
    element: <RegisterLesson />,
  },
  {
    path: "/editLesson",
    element: <EditLesson />,
  },
  /******************* 연습실 ******************/
  {
    path: "/practiceRoom",
    element: <PracticeRoomMain />,
  },
  /******************* 학원이용 결제 ******************/
  {
    path: "/payment",
    element: <PaymentMain />,
  },
  {
    path: "/kakaopayRedirect/:result",
    element: <KakaoPayRedirectPage />,
  },
]);

export default AppRouter;
