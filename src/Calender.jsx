import React, { useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container, Typography, Modal, Card, Button, Box } from "@mui/material";
import CallDetailModal from "./CallDetailModal";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { originalArray } from "./events";
// Sample events with meeting JSON details


// Localizer setup
moment.locale("en-GB");
const localizer = momentLocalizer(moment);

// Function to group overlapping events
const groupOverlappingEvents = (events) => {
  const groupedEvents = [];
  const visited = new Set();

  for (let i = 0; i < events.length; i++) {
    if (visited.has(i)) continue;

    const currentEvent = events[i];
    let group = [currentEvent];
    visited.add(i);

    for (let j = i + 1; j < events.length; j++) {
      const otherEvent = events[j];
      if (
        currentEvent.start < otherEvent.end &&
        currentEvent.end > otherEvent.start
      ) {
        group.push(otherEvent);
        visited.add(j);
      }
    }
console.log(group,"group");

    // Create a single event with overlap count
    groupedEvents.push({
      title: group[0]?.additionalDetails?.job_id?.jobRequest_Title,
      desc: group[0].desc,
      start: new Date(group[0].start),
      end: new Date(group[0].end),
      additionalDetails: group, // Keep all grouped events for detail view
      overlapCount: group.length,
    });
  }

  return groupedEvents;
};

const events = groupOverlappingEvents(
  originalArray.map((item) => ({
    id: item.id,
    summary: item.summary,
    desc: item.desc,
    start: new Date(item.start),
    end: new Date(item.end),
    additionalDetails: item,
  }))
);

const Overlap = ({ showModal, closeModal, groupedCalls,handleOverlapSelect }) => { 
  
  return (
    <Modal open={showModal} onClose={closeModal}>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxHeight: "80vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Meetings
        </Typography>
        {groupedCalls.map((call, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              mb: 2,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
            }}
            onClick={()=>handleOverlapSelect(call)}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {call.additionalDetails?.summary || "No Title"}
            </Typography>
            <Typography variant="body2">
              Interviewer: {call.additionalDetails?.user_det?.candidate?.candidate_firstName}{" "}
              {call.additionalDetails?.user_det?.candidate?.candidate_lastName}
            </Typography>
            <Typography variant="body2">
              Date: {moment(call.start).format("DD MMM YYYY")}
            </Typography>
            <Typography variant="body2">
              Time: {moment(call.start).format("hh:mm A")} - {moment(call.end).format("hh:mm A")}
            </Typography>
          
          </Box>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={closeModal}
          sx={{ mt: 2, alignSelf: "center" }}
        >
          Close
        </Button>
      </Card>
    </Modal>
  );
};

const Calender = () => {
  const [showModal, setShowModal] = useState(false);
  const [groupedCalls, setGroupedCalls] = useState([]);
const[openOverLapModal,setOpenOverLapModal]=useState(false)
const [selectEvent, setselectEvent] = useState(false);

const handleOverlapSelect=(event)=>{
setOpenOverLapModal(false)
setShowModal(true)
setGroupedCalls(event)
setselectEvent(true)

}
  const handleShowMore = (event) => {
    setselectEvent(false)
    if(event?.overlapCount>1){
      setOpenOverLapModal(true)
      setGroupedCalls(event.additionalDetails);
    }else{
      setShowModal(true);
      setGroupedCalls(event);

    }
   
  };

  const closeModal = () => {
    setShowModal(false);
    setGroupedCalls([]);
  };
  const closeOverLapModal = () => {
    setOpenOverLapModal(false);
    setGroupedCalls([]);
  };

  return (
    <Container style={{ height: "100vh", paddingTop: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        React Calendar App
      </Typography>
      <Calendar
  localizer={localizer}
  events={events}
  views={Object.values(Views)} // Ensure views are passed correctly
  defaultView={Views.MONTH} // Default to week view
  onSelectEvent={handleShowMore}
  components={{
    event: ({ event }) => {
     return <>
      <div
        style={{
          position: "relative",
          width: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          borderRadius: "10px", // Rounded corners
          padding: "4px", // Padding for inner content
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Optional shadow for a better look
        }}
      >
        <span>{event.title}</span>
       
      </div>
      {event.overlapCount > 1 && (
          <div
            style={{
              position: "absolute",
              top: 5,
              right: 1,
              width: 20,
              height: 20,
              backgroundColor: "gold",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {event.overlapCount}
          </div>
        )}
      </>
    },
    timeGutterHeader: () => null, // Removes the time column header
    timeSlotWrapper: ({ children }) => <>{children}</>, // Prevents rendering of default times
  }}
/>


      {/* Modal for showing detailed event info */}
      {showModal && (
        <CallDetailModal
          showModal={showModal}
          closeModal={closeModal}
          selectedEvent={groupedCalls}
          selectEvent={selectEvent}
        />
      )}
       {openOverLapModal && (
        <Overlap
          showModal={openOverLapModal}
          closeModal={closeOverLapModal}
          groupedCalls={groupedCalls}
          handleOverlapSelect={handleOverlapSelect}
        />
      )}
    </Container>
  );
};

export default Calender;
