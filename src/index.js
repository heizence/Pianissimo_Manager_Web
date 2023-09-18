import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./modules/routers";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <RouterProvider router={AppRouter} />
  </>
);

/*
React.StrictMode intentionally double render components (only in development) to enforce you, 
not use side effects on some of your component's lifecycle events.

the reason behind that is documented here.
https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
