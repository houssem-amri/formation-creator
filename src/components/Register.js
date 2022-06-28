import React, { Fragment, useEffect, useState } from "react";
import Hero from "./Hero";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/AuthAction";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate=useNavigate()
  const registering = useSelector((state) => state);

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Msgerr, setMsgerr] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setMsgerr(registering.Auth);
    if (registering.Auth==="User added succesful") {
      setTimeout(()=>{
        navigate("/login")
      },2000)
    }
   
  }, [dispatch, registering]);

  const handleSubmit = () => {
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: "user",
    };
    dispatch(register(data));

    console.log("here data register", data);
  };

  return (
    <Fragment>
      <Hero title="Register" />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 ml-auto">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </div>
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
                    type="text"
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

              {Msgerr==="email existe"?(
                <div class="alert alert-danger" role="alert">
                {Msgerr}
              </div>
              ):Msgerr==="User added succesful"?(
                <div class="alert alert-success" role="alert">
                {Msgerr}
              </div>
              ):null}
              
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
