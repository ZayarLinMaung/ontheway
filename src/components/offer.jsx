import React from "react";
const offer = () => {
  return (
    <div className="offerContainer">
      <h1 className="offerTitle">What we can offer you</h1>
      <div className="offer">
        <div className="design">
          <div className="details">
            <h3>Design Plan</h3>
            <h3>Description</h3>
            <ul>
              <li>UI UX Development</li>
              <li>Logo Design</li>
              <li>Photoshop</li>
            </ul>
          </div>
          <div className="price">
            <h3>Price</h3>
            <h4>$100</h4>
            <a href="">Get Service</a>
          </div>
        </div>

        <div className="semistack">
          <div className="details">
            <h3>Semi-Stack Plan</h3>
            <h3>Description</h3>
            <ul>
              <li>Design</li>
              <li>Front-End Development</li>
              <li>Deployment</li>
            </ul>
          </div>
          <div className="price">
            <h3>Price</h3>
            <h4>$400</h4>
            <a href="">Get Service</a>
          </div>
        </div>
        <div className="fullstack">
          <div className="details">
            <h3>Full-Stack Plan</h3>
            <h3>Description</h3>
            <ul>
              <li>Front-End Development</li>
              <li>Back-End Development</li>
              <li>Database Development</li>
              <li>Deployment</li>
            </ul>
          </div>
          <div className="price">
            <h3>Price</h3>
            <h4>$700</h4>
            <a href="">Get Service</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default offer;
