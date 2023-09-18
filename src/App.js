import "./App.css";
import Signin from "./screens/manager/signin";

function App() {
  const token = localStorage.getItem("token");

  if (token) {
    window.location.href = "/main";
  } else {
    return <Signin />;
  }
}

export default App;
