import React, { useEffect, useRef, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import Peer from "peerjs";
import { Button, Box } from "@mui/material";
import axios from "axios";

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [remotePeerId, setRemotePeerId] = useState("");
  const [isReceivingCall, setIsReceivingCall] = useState(false);
  const [callInstance, setCallInstance] = useState(null);
  const [myName, setMyName] = useState("");
  const [callerName, setCallerName] = useState("");
  const [expertName, setExpertName] = useState("");
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenStream, setScreenStream] = useState(null);
  const [meetingId, setMeetingId] = useState("");
  const [isPeerReady, setIsPeerReady] = useState(false);
  const [forBothId, setForBothId] = useState("");

  const peerVideo = useRef(null);
  const myVideo = useRef(null);
  const connectionRef = useRef(null);
  const userStream = useRef(null);

  //Meeting id creation
  const createNewMeeting = () => {
    const newMeetingId =
      "sanidhya-" + Math.random().toString(36).substring(2, 15);
    setMeetingId(newMeetingId);
    setForBothId(newMeetingId);
    return newMeetingId;
  };

  //For starting peer connection
  useEffect(() => {
    if (!meetingId) {
      const meetingId = forBothId;
      setMeetingId(meetingId);
    }
    console.log("MEETING ID", meetingId);
    const peer = new Peer(meetingId, {
      host: "sanidhya-1.onrender.com",
      port: 443,
      path: "/peerjs",
      debug: 3,
      secure: true,
    });

    console.log("Peer object created:", peer);

    peer.on("error", (err) => {
      console.error("PeerJS Error:", err);
    });

    connectionRef.current = peer;

    peer.on("open", (id) => {
      setUserId(id);
      console.log("Peer connection opened, User ID:", id);
      setIsPeerReady(true);
    });

    peer.on("call", (call) => {
      setCallerName(call.metadata.callerName);
      setIsReceivingCall(true);
      setCallInstance(call);
      console.log("CALL INSTABCE", call);
    });

    return () => {
      peer.destroy();
    };
  }, [meetingId]);

  useEffect(() => {
    if (!meetingId) return console.log("ERR IN FINDING MEETING ID");
    console.log("Attempting connection with MEETING ID:", meetingId);
  }, [meetingId]);

  //For calling 
  const call = async (remoteUserId, orgName) => {
    console.log("REMOTE ID", remoteUserId);
    console.log("isPeer ready", isPeerReady);
    console.log("CONECTION REF", connectionRef.current);
    if (!isPeerReady || !connectionRef.current) {
      console.error("PeerJS connection error: ", {
        isPeerReady,
        connectionRef: connectionRef.current,
      });
      return;
    }

    const getUserMedia =
      navigator.mediaDevices.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    await getUserMedia({ video: true, audio: true })
      .then(async (stream) => {
        // Storing the webcam stream
        userStream.current = stream;

        if (myVideo.current) {
          myVideo.current.srcObject = stream;
          myVideo.current.play();
        }

        const call = connectionRef.current.call(remoteUserId, stream, {
          metadata: { callerName: orgName },
        });

        if (!call) {
          console.error("Call instance could not be created");
          return;
        }

        call.on("stream", (remoteStream) => {
          if (peerVideo.current) {
            peerVideo.current.srcObject = remoteStream;
            peerVideo.current.play();
          }
        });

        call.on("close", () => {
          console.log("Call ended");
        });
      })
      .catch((error) => console.error("Error accessing media devices", error));
  };

  //For answering the call
  const answerCall = (e) => {
    const getUserMedia =
      navigator.mediaDevices.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    const orgName = e.target.value;
    setMyName(orgName);

    getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userStream.current = stream;

        if (myVideo.current) {
          myVideo.current.srcObject = stream;
          myVideo.current.play();
        }

        if (callInstance) {
          callInstance.answer(stream);
          callInstance.on("stream", (remoteStream) => {
            if (peerVideo.current) {
              peerVideo.current.srcObject = remoteStream;
              peerVideo.current.play();
            }
          });
          setCallerName(callInstance.metadata.callerName);
        }

        setIsReceivingCall(false);
      })
      .catch((error) => console.error("Error accessing media devices", error));
  };

  //Screen share
  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
        setScreenStream(screenStream);
        setIsScreenSharing(true);

        const videoTrack = screenStream.getVideoTracks()[0];
        const sender = callInstance?.peerConnection
          .getSenders()
          .find((s) => s.track.kind === "video");

        if (sender) sender.replaceTrack(videoTrack);

        videoTrack.onended = () => {
          stopScreenShare();
        };
      } catch (err) {
        console.error("Error sharing screen:", err);
      }
    } else {
      stopScreenShare();
    }
  };

  const stopScreenShare = () => {
    setIsScreenSharing(false);

    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
    }

    const videoTrack = userStream.current.getVideoTracks()[0];
    const sender = callInstance?.peerConnection
      .getSenders()
      .find((s) => s.track.kind === "video");

    if (sender) sender.replaceTrack(videoTrack);
  };

  //Leaving the call
  const leaveCall = () => {
    if (callInstance) {
      window.location.reload();
      callInstance.close();
      setCallInstance(null);
      console.log("Call ended");
    }
  };

  return (
    <SocketContext.Provider
      value={{
        userId,
        remotePeerId,
        setRemotePeerId,
        call,
        myVideo,
        peerVideo,
        isReceivingCall,
        answerCall,
        callerName,
        myName,
        setMyName,
        leaveCall,
        expertName,
        setExpertName,
        toggleScreenShare,
        isScreenSharing,
        callInstance,
        setMeetingId,
        meetingId,
        createNewMeeting,
        isPeerReady,
      }}
    >
      {children}
      {callInstance && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ margin: "2rem" }}
        >
          <Button onClick={leaveCall} variant="contained" color="primary">
            Hang Up
          </Button>
        </Box>
      )}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
