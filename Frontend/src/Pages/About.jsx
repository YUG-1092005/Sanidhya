import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
      <div class="sanidhya-about-header-container">
        <h1 class="sanidhya-about-header-title">At Sanidhya</h1>
        <p class="sanidhya-about-header-subtitle">
          Discover our mission, values, and the impact we create together.
        </p>
      </div>

      <div className="about-container">
        <div className="content">
          <div className="text-section">
            <h1 className="about-title">About Us</h1>
            <p className="description">
              Welcome to <strong>Sanidhya</strong>, a platform dedicated to
              breaking barriers and building bridges for an inclusive world. Our
              mission is to connect, empower, and inspire organizations that
              support the visually and physically impaired.
            </p>
            <p className="description">
              At Sanidhya, we are passionate about enabling access to resources,
              expert networks, and technology tailored for special needs.
              Together, we are creating a community that champions empowerment,
              inclusivity, and meaningful change.
            </p>
            <p className="description">
              Join us on our journey to make a difference. Together, let’s
              create a world where everyone has the support they need to thrive.
            </p>
            <button className="read-more-button">Read More</button>
          </div>
          <div className="image-section">
            <img
              src={"/about.jpg"}
              alt="Illustration of community support"
              className="about-image"
            />
          </div>
        </div>
      </div>
      <div className="about-section">
        <div className="about-heading">
          <h1>Our Role</h1>
          <h2>Designing a pathway from problem to solution</h2>
          <hr />
        </div>
        <div className="about-content">
          <div className="about-left">
            <p className="subheading">Creative services</p>
            <div className="accordion">
              {accordionData.map((item, index) => (
                <div key={index} className="accordion-item">
                  <button
                    className={`accordion-title ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() => toggleAccordion(index)}
                  >
                    {item.title}
                    <span className="accordion-icon">
                      {activeIndex === index ? "-" : "+"}
                    </span>
                  </button>
                  <div
                    className={`accordion-content ${
                      activeIndex === index ? "open" : ""
                    }`}
                  >
                    {activeIndex === index && (
                      <>
                        {item.subtitle && (
                          <p>
                            <strong>{item.subtitle}</strong>
                          </p>
                        )}
                        <p>{item.content}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        class="sanidhya-about-homepage-container"
        style={{ marginTop: "2rem" }}
      >
        <h2 class="sanidhya-about-heading">Explore Our Services</h2>
        <div class="sanidhya-about-card-columns">
          <div class="sanidhya-about-card-column">
            <div class="sanidhya-about-card sanidhya-about-card1">
              <img
                src="/about_1.avif"
                alt="Description for Image 1"
                class="sanidhya-about-card-image"
              />
              <h3 class="sanidhya-about-card-title">Awareness and Advocacy</h3>
              <p class="sanidhya-about-card-content">
                Join us in raising awareness and advocating for the rights of
                physically and visually impaired individuals, ensuring their
                voices are heard and their needs are met.
              </p>
            </div>
            <div class="sanidhya-about-card sanidhya-about-card2">
              <img
                src="/about_2.jpg"
                alt="Description for Image 2"
                class="sanidhya-about-card-image"
              />
              <h3 class="sanidhya-about-card-title">Assistive Technologies</h3>
              <p class="sanidhya-about-card-content">
                Explore a range of innovative assistive technologies that
                enhance accessibility and improve the quality of life for those
                with visual and physical impairments.
              </p>
            </div>
            <div class="sanidhya-about-card sanidhya-about-card3">
              <img
                src="/about_3.jpg"
                alt="Description for Image 3"
                class="sanidhya-about-card-image"
              />
              <h3 class="sanidhya-about-card-title">Educational Workshops</h3>
              <p class="sanidhya-about-card-content">
                Our educational workshops empower participants with knowledge
                and skills, covering topics from life skills to digital
                literacy, promoting lifelong learning.
              </p>
            </div>
          </div>

          <div class="sanidhya-about-card-column">
            <div class="sanidhya-about-card sanidhya-about-card4">
              <img
                src="/about_4.jpg"
                alt="Description for Image 4"
                class="sanidhya-about-card-image"
              />
              <h3 class="sanidhya-about-card-title">Inclusive Events</h3>
              <p class="sanidhya-about-card-content">
                Participate in our inclusive events that bring together
                individuals from all walks of life, fostering a sense of
                community and shared experience through activities.
              </p>
            </div>
            <div class="sanidhya-about-card sanidhya-about-card5">
              <img
                src="/about_5.jpg"
                alt="Description for Image 5"
                class="sanidhya-about-card-image"
              />
              <h3 class="sanidhya-about-card-title">
                {" "}
                Community Support Services
              </h3>
              <p class="sanidhya-about-card-content">
                We offer comprehensive community support services that provide
                guidance, resources, and a network of caring individuals
                dedicated to helping you thrive.
              </p>
            </div>
            <div class="sanidhya-about-card sanidhya-about-card6">
              <img
                src="/about_6.avif"
                alt="Description for Image 6"
                class="sanidhya-about-card-image"
              />
              <h3 class="sanidhya-about-card-title"> Empowerment Programs</h3>
              <p class="sanidhya-about-card-content">
                Our empowerment programs are designed to equip individuals with
                the skills and confidence needed to navigate daily challenges,
                fostering independence and self-sufficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="sanidhya-about-cylindrical-container">
        <div class="sanidhya-about-cylindrical-content">
          <h3 class="sanidhya-about-cylindrical-title">Our Mission</h3>
          <p class="sanidhya-about-cylindrical-description">
            At Sanidhya, we strive to empower individuals and create a more
            inclusive society where everyone has the opportunity to thrive.
          </p>
        </div>
      </div>

      <div class="sanidhya-about-impact-section">
        <h2 class="sanidhya-about-impact-heading">Our Impact</h2>
        <div class="sanidhya-about-impact-stats">
          <div class="sanidhya-about-impact-card">
            <div class="sanidhya-about-impact-icon-container">
              <i class="sanidhya-about-impact-icon fas fa-users"></i>{" "}
            </div>
            <div class="sanidhya-about-impact-counter">2000+</div>
            <p class="sanidhya-about-impact-description">Lives Improved</p>
          </div>

          <div class="sanidhya-about-impact-card">
            <div class="sanidhya-about-impact-icon-container">
              <i class="sanidhya-about-impact-icon fas fa-handshake"></i>
            </div>
            <div class="sanidhya-about-impact-counter">50+</div>
            <p class="sanidhya-about-impact-description">
              Partnerships Created
            </p>
          </div>

          <div class="sanidhya-about-impact-card">
            <div class="sanidhya-about-impact-icon-container">
              <i class="sanidhya-about-impact-icon fas fa-check-circle"></i>{" "}
            </div>
            <div class="sanidhya-about-impact-counter">75+</div>
            <p class="sanidhya-about-impact-description">Projects Completed</p>
          </div>
        </div>
      </div>
      <div class="sanidhya-about-cta-container">
        <h2 class="sanidhya-about-cta-heading">
          Join Us in Making a Difference!
        </h2>
        <p class="sanidhya-about-cta-description">
          Be part of our community and help us empower individuals with
          disabilities. Together, we can create a more inclusive society.
        </p>
        <div class="sanidhya-about-cta-buttons">
          <Link to="/user/register" class="sanidhya-about-cta-button">
            Sign Up Now
          </Link>
          <Link
            to="/contactus"
            class="sanidhya-about-cta-button sanidhya-about-cta-button-secondary"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
};
const accordionData = [
  {
    title: "Empowerment Through Design",
    subtitle: "Transforming challenges into opportunities.",
    content:
      "At Sanidhya, we empower individuals by using strategic design to address their unique challenges, ensuring they have access to essential services and support.",
  },
  {
    title: "Inclusive Solutions",
    subtitle: "Designing for everyone.",
    content:
      "Our approach centers on creating inclusive solutions that cater to the diverse needs of the physically and visually impaired, ensuring accessibility and usability.",
  },
  {
    title: "Community Engagement",
    subtitle: "Building a better tomorrow together.",
    content:
      "We actively engage with the community to understand their needs, co-designing solutions that reflect their experiences and aspirations.",
  },
  {
    title: "Innovative Technologies",
    subtitle: "Leveraging technology for greater accessibility.",
    content:
      "Utilizing the latest technologies, we create innovative tools and platforms that enhance the lives of our users and promote independence.",
  },
  {
    title: "Sustainable Practices",
    subtitle: "Designing for the future.",
    content:
      "We believe in sustainable design practices that not only address current needs but also consider the long-term impact on individuals and communities.",
  },
];

export default About;
