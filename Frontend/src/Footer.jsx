import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faSquareInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="icons">
        <a>
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a>
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
        <a>
          <FontAwesomeIcon icon={faSquareInstagram} />
        </a>
        <a>
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>
      <div className="copyright">&copy; Sanidhya.</div>
      <div className="footer-links">
        <Link to="/sanidhya/terms/privacy" className="footer-link">
          Privacy Policy & Terms & Conditions
        </Link>
      </div>
    </div>
  );
};

export default Footer;
