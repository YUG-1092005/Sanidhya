import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { events } from "./events.js";
import WorkshopForm from "./form";
import "./workshop.css";
import { Tooltip, Dialog, DialogTitle, DialogContent } from "@mui/material";

const Workshop = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const baseUrl = "https://sanidhya-official.netlify.app";


  const formattedEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    description: event.description,
    location: event.location,
    registrationLink: event.registrationLink,
  }));

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
  };

  const renderEventContent = (eventInfo) => (
    <Tooltip title={eventInfo.event.title} arrow style={{ fontSize: "18px" }}>
      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          cursor: "pointer",
          backgroundColor: "#C4D7FF",
          borderRadius: "2px",
        }}
      >
        <strong style={{ fontSize: "16px" }}>{eventInfo.event.title}</strong>
      </div>
    </Tooltip>
  );

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        <center>Workshops List</center>
      </h2>
      <div style={{ padding: "0 1rem" }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={formattedEvents}
          height="auto"
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
        />
      </div>
      <br />
      <br />
      {selectedEvent && (
        <Dialog
          open={Boolean(selectedEvent)}
          onClose={() => setSelectedEvent(null)}
          maxWidth="sm"
          fullWidth
          style={{ padding: "1rem" }}
        >
          <DialogTitle style={{ textAlign: "center", fontSize: "20px" }}>
            {selectedEvent.title}
          </DialogTitle>
          <DialogContent style={{ fontSize: "16px", lineHeight: "1.5" }}>
            <div>{`Date: ${new Date(
              selectedEvent.start
            ).toLocaleDateString()}`}</div>
            <div>{`Time: ${new Date(selectedEvent.start).toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )} - ${new Date(selectedEvent.end).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`}</div>
            <div>{`Location: ${selectedEvent.extendedProps.location}`}</div>
            <div>{`Description: ${selectedEvent.extendedProps.description}`}</div>
            <a
              href={`${baseUrl}${selectedEvent.extendedProps.registrationLink}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                marginTop: "1rem",
                padding: "10px 15px",
                backgroundColor: "#1976D2",
                color: "white",
                textAlign: "center",
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              Register
            </a>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Workshop;
