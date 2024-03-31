import Home from "./components/Home";
import Login from "./components/Login"
import {
  Routes,
  Route,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";

function App() {

  return (
    <div className="App">
      <Navbar />
        <Routes>
            <Route
                path="/"
                element={<Login/>}
            ></Route>
            <Route
                path="/dashboard"
                element={<Home />}
            ></Route>
            <Route
                path="/signup"
                element={<SignUp />}
            ></Route>
        </Routes>
    </div>
  )
}

export default App
