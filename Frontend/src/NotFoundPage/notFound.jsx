import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";

const notFound = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <div className="error-combine">
          <h1>404</h1>
          <img src="/notfound.jpg" />
        </div>
        <h4>Oops! We couldn't find that page.</h4>
        <p>
          We're sorry, but the page you were looking for could not be found. It
          may have been removed, renamed, or never existed. Please check the URL
          or return to the homepage to find what you need.
        </p>
        <div className="error-btns">
          <Link to="/" className="err-btn-link">
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default notFound;
