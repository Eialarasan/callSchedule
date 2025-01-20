

import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CloseIcon from "@mui/icons-material/Close";
import VideoCallIcon from '@mui/icons-material/VideoCall';

import { Container, Modal, Box, Typography, Link, Button, Grid2, Grid, Card, IconButton } from "@mui/material";
const CallDetailModal=({showModal,closeModal,selectedEvent,selectEvent})=>{
    console.log(selectedEvent,selectEvent,"selectedEvent")
    return  <Modal open={showModal} onClose={closeModal}>
    <Card
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: 2,
        p: 3,
        border: "none", // Remove the black border
      }}
    >
        <IconButton
          onClick={closeModal}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.600",
          }}
        >
          <CloseIcon />
        </IconButton>

      <Typography
        variant="h6"
        align="center"
        sx={{ fontWeight: "bold", marginBottom: 2 }}
      >
        {moment(selectedEvent?.start).format("DD MMMM YYYY")}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
        }}
      >
        {/* Left Column */}
        <Box>
          <Typography variant="body1" fontWeight="bold">
            Interview With: {selectEvent?selectedEvent?.additionalDetails?.user_det?.candidate?.candidate_firstName:selectedEvent?.additionalDetails[0]?.additionalDetails?.user_det?.candidate?.candidate_firstName}{" "}
            {selectEvent?selectedEvent?.additionalDetails?.user_det?.candidate?.candidate_lastName:selectedEvent?.additionalDetails[0]?.additionalDetails?.user_det?.candidate?.candidate_lastName}
          </Typography>
          <Typography variant="body1">
            Position: {selectEvent?selectedEvent?.additionalDetails?.job_id?.jobRequest_Title:selectedEvent?.additionalDetails[0]?.additionalDetails?.job_id?.jobRequest_Title}
          </Typography>
          <Typography variant="body1">
            Created By: {selectEvent?selectedEvent?.additionalDetails?.user_det?.handled_by?.firstName || "-":selectedEvent?.additionalDetails[0]?.additionalDetails?.user_det?.handled_by?.firstName || "-"}
          </Typography>
          <Typography variant="body1">
            Interview Date:{" "}
            {moment(selectedEvent?.start).format("DD MMM YYYY")}
          </Typography>
          <Typography variant="body1">
            Interview Time:{" "}
            {moment(selectedEvent?.start).format("hh:mm A")} -{" "}
            {moment(selectedEvent?.end).format("hh:mm A")}
          </Typography>
          <Typography variant="body1">
            Interview Via: Google Meet
          </Typography>
        </Box>
  
        {/* Right Column */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {/* Google Meet Join Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textTransform: "none",
              marginBottom: 2,
            }}
            href={selectEvent?selectedEvent?.additionalDetails?.link:selectedEvent?.additionalDetails[0]?.additionalDetails?.link}
            target="_blank"
          >
           
            <VideoCallIcon/>
            JOIN
          </Button>
  
          {/* Download Buttons */}
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              marginBottom: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
            startIcon={<i className="far fa-file-word"></i>}
            href="#"
            download="Resume.docx"
          >
            Resume.docx
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
            startIcon={<i className="fas fa-id-card"></i>}
            href="#"
            download="Aadharcard.pdf"
          >
            Aadharcard
          </Button>
        </Box>
      </Box>
    </Card>
  </Modal>
}
export default CallDetailModal