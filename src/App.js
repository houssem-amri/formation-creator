import { Fragment, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { refreshToken } from "./redux/actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import Add_match from "./components/Add_match";
import Edit_match from "./components/Edit_match";
import Matches from "./components/Matches";
import Add_players from "./components/Add_players";
import Players from "./components/Players";
import Main from "./components/formation/Main";
import Edit_players from "./components/Edit_players";

function App() {
  const [role, setRole] = useState(null);
  const auth = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    setRole(auth.Auth)
    console.log("auth.Auth");
    dispatch(refreshToken());
  }, [dispatch,auth]);



  return (
    // <Home/>
    <div className="site-wrap">
      <BrowserRouter>
        <Header role={role} />
        <Routes>
          <Route path="/" element={<Home />} />
          {role === "user" ? (
            <Fragment>
              <Route path="Add_match" element={<Add_match />} />
              <Route path="Edit_match:id" element={<Edit_match />} />
              <Route path="Edit_player:id" element={<Edit_players />} />
              <Route path="Matches" element={<Matches />} />
              <Route path="Players" element={<Players />} />
              <Route path="Add_player" element={<Add_players />} />
              <Route path="Main_pitch:id" element={<Main/>} />
            </Fragment>
          ) : role === "admin" ? (
            <Fragment></Fragment>
          ) : (
            <Fragment>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Fragment>
          )}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
