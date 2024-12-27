import React from "react";
import Intro from "./intro.jsx";
import Offer from "./offer.jsx";
import Visionary from "./visionary.jsx";
const body = () => {
  return (
    <div className="container">
      <div className="container1">
        <Intro />
      </div>
      <div className="container2">
        <Visionary />
      </div>
      <div className="container3"></div>
      <div className="container4">
        <Offer />
      </div>
      <div className="container5"></div>
    </div>
  );
};
export default body;
