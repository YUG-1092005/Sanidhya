import React, { useState, useEffect } from "react";
import {
  Rating,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Grid,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RateExpert = ({ id, expertName, userId, userName }) => {
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState([]);

  //Fetching ratings from db
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_SERVER_URL}/expert/ratings/${id}`
        );
        setRatings(response.data);
      } catch (error) {
        console.error("Error fetching ratings", error);
      }
    };

    fetchRatings();
  }, [id]);

  //Submitting ratings
  const handleRatingSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_SERVER_URL}/expert/rating/${id}`,
        { userId, rating, userName }
      );
      toast.success("Rating submitted!");

      setRatings((prevRatings) => [
        ...prevRatings,
        { userId, userName, rating },
      ]);

      setRating(0);
    } catch (error) {
      console.error("Error submitting rating", error);
      toast.error("Failed to submit rating, please try later.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
          width: "100%",
          maxWidth: "400px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Rate <strong>{expertName}</strong>
          </Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.5}
            sx={{
              "& .MuiRating-icon": {
                fontSize: { xs: "2rem", sm: "2.5rem" },
                color: "gold",
              },
              "& .MuiRating-iconFilled": {
                color: "gold",
              },
              "& .MuiRating-iconHover": {
                color: "gold",
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRatingSubmit}
            disabled={rating === 0}
            sx={{
              marginTop: "1.5rem",
              padding: "0.75rem 2rem",
              fontWeight: "bold",
            }}
          >
            Submit Rating
          </Button>
        </Box>
      </Box>

      <Box
        sx={{ mt: 3, width: "100%", maxWidth: "800px", margin: "auto" }}
        style={{ paddingTop: "2rem" }}
      >
        <Typography variant="h6" gutterBottom>
          {ratings.length > 0 ? "Some Reviews..." : ""}
        </Typography>
        <Grid container spacing={2}>
          {ratings.length > 0
            ? ratings.map((r, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card sx={{ boxShadow: 2 }}>
                    <CardContent>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Avatar sx={{ bgcolor: "blue", mr: 2 }}>
                          {r.userName.charAt(0)}
                        </Avatar>

                        <Box>
                          <Typography variant="h6">{r.userName}</Typography>
                          <Rating
                            value={r.rating}
                            readOnly
                            precision={0.5}
                            sx={{ color: "gold" }}
                          />
                        </Box>
                      </Box>
                      {r.comment && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {r.comment}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : ""}
        </Grid>
      </Box>
      <ToastContainer />
    </>
  );
};

export default RateExpert;
