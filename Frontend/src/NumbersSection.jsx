import React from "react";
import "./NumbersSection.css";
import Countup from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NumbersSection = () => {
  const navigate = useNavigate();
  const [counterOn, setCounterOn] = useState(false);

  const handleJoin = () => {
    navigate("/user/register");
  };

  return (
    <div>
      <div className="partner-showcase">
        <div className="partners-no">
          <div>
            <h2 className="animated-number" data-target="2000">
              <ScrollTrigger
                onEnter={() => {
                  setCounterOn(true);
                }}
                onExit={() => {
                  setCounterOn(false);
                }}
              >
                {counterOn && <Countup start={0} end={2000} delay={0.5} />}+
              </ScrollTrigger>
            </h2>
            <p>Organizations Partnerships</p>
          </div>
          <div>
            <h2 className="animated-number" data-target="3000">
              <ScrollTrigger
                onEnter={() => {
                  setCounterOn(true);
                }}
                onExit={() => {
                  setCounterOn(false);
                }}
              >
                {counterOn && <Countup start={0} end={3000} delay={0.5} />}+
              </ScrollTrigger>
            </h2>{" "}
            <p>Events Completed</p>
          </div>
          <div>
            <h2 className="animated-number" data-target="1500">
              <ScrollTrigger
                onEnter={() => {
                  setCounterOn(true);
                }}
                onExit={() => {
                  setCounterOn(false);
                }}
              >
                {counterOn && <Countup start={0} end={1500} delay={0.5} />}+
              </ScrollTrigger>
            </h2>
            <p>Volunteers Dedication</p>
          </div>
        </div>
      </div>
      <div className="showcasing-join">
        <h2 className="empower-title">
          Empowering 3.9+ Lakh lives through our services, and support.
        </h2>
        <div className="join-content" onClick={handleJoin}>
          <h2>Join Us</h2>
          <lord-icon
            src="https://cdn.lordicon.com/whtfgdfm.json"
            trigger="hover"
            colors="primary:#ffffff"
          ></lord-icon>
        </div>
      </div>
    </div>
  );
};
export default NumbersSection;
