import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Homepage from "./Homepage.jsx";
import { MobilityDetails } from "./Cards Pages/MobilityDetails.jsx";
import { VisionDetails } from "./Cards Pages/VisionDetails.jsx";
import { RehabilitateDetails } from "./Cards Pages/RehabilitateDetails.jsx";
import Contactus from "./Introduction/Contactus.jsx";
import About from "./Pages/About.jsx";
import Signup from "./Authenticate/Signup.jsx";
import Signin from "./Authenticate/Signin.jsx";
import Experts from "./Experts/Experts.jsx";
import Expert from "./Experts/Expert.jsx";
import ExpertRegistration from "./Experts/ExpertRegistration.jsx";
import List from "./Organizations/List.jsx";
import Viewmore from "./Organizations/Viewmore.jsx";
import Chat from "./Chats/Chat.jsx";
import Call from "../VideoCall/Call.jsx";
import Orgcall from "../Orgcall/Orgcall.jsx";
import { ContextProvider } from "./Videoconference.jsx";
import Edit from "./Experts/Edit.jsx";
import Add from "./Organizations/Add.jsx";
import Orgedit from "./Organizations/Orgedit.jsx";
import Workshop from "./Workshops/workshop.jsx";
import WorkshopForm from "./Workshops/form.jsx";
import NotFound from "./NotFoundPage/notFound.jsx";
import Privacy from "./Pages/privacy.jsx";

const AppRoutes = ({ setIsAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "PUSH" || navigationType === "POP") {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [location, navigationType]);

  return (
    <div>
      {loading ? (
        <div className="loader-wrapper">
          <ClipLoader
            color={"#80bbbb"}
            loading={loading}
            size={90}
            className="loader"
          />
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/sanidhya/terms/privacy" element={<Privacy />} />
            <Route path="/mobility" element={<MobilityDetails />} />
            <Route path="/vision" element={<VisionDetails />} />
            <Route path="/rehabilitate" element={<RehabilitateDetails />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/aboutus" element={<About />} />
            <Route
              path="/user/register"
              element={<Signup setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/user/login"
              element={<Signin setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/expert/list" element={<Experts />} />
            <Route path="/sanidhya/workshops" element={<Workshop />} />
            <Route
              path="/sanidhya/workshop/registration"
              element={<WorkshopForm />}
            />
            <Route path="/expert/:id" element={<Expert />} />
            <Route path="/expert/:id/edit" element={<Edit />} />
            <Route
              path="/expert/registration"
              element={<ExpertRegistration />}
            />
            <Route path="/organization/list" element={<List />} />
            <Route path="/organization/add" element={<Add />} />
            <Route path="/organization/:orgId/edit" element={<Orgedit />} />
            <Route path="/organization/:orgId" element={<Viewmore />} />
            <Route path="/sanidhya/chat" element={<Chat />} />
            <Route
              path="/sanidhya/expert-call/:id"
              element={
                <ContextProvider>
                  <Call />
                </ContextProvider>
              }
            />
            <Route
              path="/sanidhya/org-call/:orgid"
              element={
                <ContextProvider>
                  <Orgcall />
                </ContextProvider>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default AppRoutes;
