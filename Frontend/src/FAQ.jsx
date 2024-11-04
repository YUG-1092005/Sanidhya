import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "./FAQ.css";
import { useNavigate } from "react-router-dom";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTopLeftRadius: theme.spacing(2),
  borderTopRightRadius: theme.spacing(2),
  borderBottomLeftRadius: theme.spacing(2),
  borderBottomRightRadius: theme.spacing(2),

  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "1.5rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#D8EFD3",
  borderTopLeftRadius: theme.spacing(2),
  borderTopRightRadius: theme.spacing(2),
  borderBottomLeftRadius: theme.spacing(1),
  borderBottomRightRadius: theme.spacing(1),
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const navigate = useNavigate();

  const handleContact = () => {
    navigate("/contactus");
  };

  return (
    <div>
      <div className="faq-heading">
        <h2
          style={{ textAlign: "center", fontSize: "2.5rem", color: "#1d4343" }}
        >
          FAQ's
        </h2>
      </div>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <div style={{ width: "85%" }}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              style={{ height: "5rem" }}
            >
              <Typography style={{ fontSize: "1.5rem" }} className="faq-que">
                How does Sanidhya help organizations and individuals?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={{ fontSize: "1.2rem", opacity: 0.8 }}>
                Sanidhya partners with organizations to enhance their outreach
                and support capabilities for the blind and physically impaired.
                Individuals can access a range of services and resources through
                our platform.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ width: "85%" }}>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
              style={{ height: "5rem" }}
            >
              <Typography style={{ fontSize: "1.5rem" }} className="faq-que">
                How can organizations benefit from partnering with Sanidhya?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={{ fontSize: "1.2rem", opacity: 0.8 }}>
                Organizations can expand their reach and impact by partnering
                with Sanidhya, gaining access to a network of resources,
                volunteers, and expertise dedicated to supporting the disabled
                community.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ width: "85%" }}>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
              style={{ height: "5rem" }}
            >
              <Typography style={{ fontSize: "1.5rem" }} className="faq-que">
                How can I get involved with Sanidhya?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={{ fontSize: "1.2rem", opacity: 0.8 }}>
                You can get involved by volunteering your time or expertise.
                Explore opportunities on our website to contribute to our
                mission.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="showcasing-join" style={{ marginTop: "6rem" }}>
        <h2 className="empower-title">Having More Queries?</h2>
        <div
          className="join-content"
          onClick={handleContact}
          style={{ margin: "1rem" }}
        >
          <h2>Contact Us</h2>
          <lord-icon
            src="https://cdn.lordicon.com/whtfgdfm.json"
            trigger="hover"
            colors="primary:#ffffff"
          ></lord-icon>
        </div>
      </div>
    </div>
  );
}
