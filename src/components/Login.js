import React, { Fragment, useEffect, useState } from "react";
import Hero from "./Hero";
import { useDispatch ,useSelector} from 'react-redux'
import { login } from '../redux/actions/AuthAction'
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate=useNavigate()

  const logined = useSelector(state => state);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Msgerr, setMsgerr] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setMsgerr(logined.Auth.message);
    if (logined.Auth.message==="logged successfully") {
      if (logined.Auth.user.role==="user") {
        navigate("/Matches")

      }
      if (logined.Auth.user.role==="admin") {
        navigate("/Admin")

      }

    }
   
  }, [dispatch, logined]);


  const handleSubmit = () => {
    let data = {
      email: email,
      password: password,
    };
    dispatch(login(data));
  };


  return (
    <Fragment>
      <Hero title="Login" />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 ml-auto">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="E-mail"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="button"
                    className="btn btn-primary py-3 px-5"
                    defaultValue="Register"
                    onClick={handleSubmit}
                  />
                </div>
              </form>
              {Msgerr==="Check your email address"?(
                <div class="alert alert-danger" role="alert">
                {Msgerr}
              </div>
              ):Msgerr==="Check your password"?(
                <div class="alert alert-danger" role="alert">
                {Msgerr}
              </div>
              ):Msgerr==="logged successfully"?(
                <div class="alert alert-success" role="alert">
                {Msgerr}
              </div>):null}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
