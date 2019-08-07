import React from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  const { menu } = props;
  return (
    <header
      className="black-bg mh-header mh-fixed-nav nav-scroll mh-xs-mobile-nav nav-strict"
      id="mh-header"
    >
      {" "}
      {/*nav-strict for hiding and sticking header - keep in state*/}
      <div className="overlay" />
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg mh-nav nav-btn">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto ml-auto">
                <li
                  className={menu === "home" ? "nav-item active" : "nav-item"}
                >
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
