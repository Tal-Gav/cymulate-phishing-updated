import { Box, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Phishing = () => {
  const theme = useTheme();
  const { id } = useParams();

  useEffect(() => {
    const updateTarget = async () => {
      try {
        const response = await axios.put(
          "http://localhost:3000/phishing/" + id
        );
      } catch (error) {
        console.error("Error occurred while making the PUT request:", error);
      }
    };

    updateTarget();
  }, []);
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      p={2}
    >
      <Typography
        fontFamily={"Segoe UI"}
        fontWeight={"bold"}
        letterSpacing={2}
        variant="h2"
        color={theme.palette.primary.main}
      >
        Free bitcoin!
      </Typography>
    </Box>
  );
};

export default Phishing;
