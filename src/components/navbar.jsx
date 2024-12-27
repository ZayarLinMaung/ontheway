import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const navbar = () => {
  return (
    <>
      <div>
        <header>
          <div className="left">On The Way</div>
          <div className="right">
            <a href="/profile">
              <FontAwesomeIcon icon={faUser} style={{ color: "#f9f19f" }} />
            </a>
            <a href="/login">Logout</a>
          </div>
        </header>
        <body>
          <div className="bLeft"></div>
          <div className="bMain"></div>
        </body>
        <footer></footer>
      </div>
    </>
  );
};
export default navbar;
