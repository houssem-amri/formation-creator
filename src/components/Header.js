import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/AuthAction";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  let navigate = useNavigate();

  const { role } = props;
  const dispatch = useDispatch();

  const clickLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Fragment>
      <div>
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close">
              <span className="icon-close2 js-menu-toggle" />
            </div>
          </div>
          <div className="site-mobile-menu-body" />
        </div>
        <header className="site-navbar py-4" role="banner">
          <div className="container">
            <div className="d-flex align-items-center">
              <div className="site-logo">
                <a href="index.html">
                  <img src="images/logo.png" alt="Logo" />
                </a>
              </div>
              <div className="ml-auto">
                <nav
                  className="site-navigation position-relative text-right"
                  role="navigation"
                >
                  <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                    {role === "user" ? (
                      <Fragment>
                        <li className="active">
                          <Link to="Matches" className="nav-link">
                            Matches
                          </Link>
                        </li>
                        <li>
                          <Link to="Players" className="nav-link">
                            Players
                          </Link>
                        </li>
                        <li>
                          <Link to="Add_match" className="nav-link">
                            Add Matches
                          </Link>
                        </li>
                        <li>
                          <Link to="Add_player" className="nav-link">
                            Add Players
                          </Link>
                        </li>
                        <li>
                          <a
                            onClick={() => clickLogout()}
                            style={{ cursor: "pointer" }}
                            className="nav-link"
                          >
                            Logout
                          </a>
                        </li>
                      </Fragment>
                    ): role === "admin" ?(
                      <Fragment>
                        <li>
                          <Link to="/admin_Users" className="nav-link">
                            Users
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin_Matches" className="nav-link">
                            Matches
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin_Players" className="nav-link">
                            Players
                          </Link>
                        </li>

                      </Fragment>
                    ):( <Fragment>
                      <li>
                        <Link to="/" className="nav-link">
                          Home
                        </Link>
                      </li>

                      <li>
                        <Link to="login" className="nav-link">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="register" className="nav-link">
                          Register
                        </Link>
                      </li>
                    </Fragment>)}
                  </ul>
                </nav>
                <a
                  href="#"
                  className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white"
                >
                  <span className="icon-menu h3 text-white" />
                </a>
              </div>
            </div>
          </div>
        </header>
      </div>
    </Fragment>
  );
}
