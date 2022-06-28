import axios from "axios";
import { useNavigate } from "react-router-dom";



export const TYPES = {
  AUTH: "AUTH",
};

export const register = (data) => async (dispatch) => {
  const result = await axios.post("http://localhost:3200/api/register", data);
  if (result) dispatch({ type: "AUTH", payload: result.data.message });
  dispatch({ type: "AUTH", payload: result.data.message });
};

export const login = (data) => async (dispatch) => {
  const result = await axios.post("http://localhost:3200/api/auth", data);

  if (result.data.type === "success") {
    setSession(result.data.access_token, result.data.user);
    dispatch({ type: "AUTH", payload: {message:result.data.message, user:result.data.user} });

  } else {
    dispatch({ type: "AUTH", payload: {message:result.data.message} });

  }
  // if (result) dispatch({ type: "AUTH", payload: result.data.message });
  // dispatch({ type: "AUTH", payload: result.data.message })
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("jwt_access_token");
    localStorage.removeItem("connected_user");
    dispatch({ type: "AUTH", payload: "success Logout" });
  } catch (err) {
    dispatch({ type: "AUTH", payload: "Failled Logout" });
  }
};

export const refreshToken = () => async (dispatch) => {
  const access_token = localStorage.getItem("jwt_access_token");

  if (access_token) {
    try {
      const res = await axios.post(
        "http://localhost:3200/api/auth/access-token",
        { access_token: access_token }
      );
      console.log("hererererererer refresh");
      if (res.data.message === "0") {
        dispatch({ type: "AUTH", payload: res.data.user.role });
        setSession(res.data.access_token, res.data.user);
      } else {
        localStorage.removeItem("connected_user");
        dispatch({ type: "AUTH", payload: null });
      }
    } catch (err) {
      console.log("err token", err);
    }
  }
};

const setSession = (access_token, user) => {
  if (access_token) {
    localStorage.setItem("jwt_access_token", access_token);
    localStorage.setItem("connected_user", JSON.stringify(user));

    axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
  } else {
    localStorage.removeItem("jwt_access_token");
    localStorage.removeItem("connected_user");
    delete axios.defaults.headers.common.Authorization;
  }
};
