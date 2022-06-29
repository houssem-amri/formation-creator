import React, { Fragment, useEffect, useState } from "react";
import Hero from "./Hero";
import axios from "axios";
export default function List_users() {
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    axios
      .get("http://localhost:3200/api/get_users")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <Fragment>
      <Hero title="Users" />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="widget-next-match">
                <div className="widget-title">
                  <h3>Users List  <span className="float-right">Total Users is {Users.length}</span>   </h3>
                </div>
                <div className="widget-body mb-3">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Users.map((user, key) => (
                        <tr key={key}>
                          <th scope="row">{key}</th>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                          <td>{user.password}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
