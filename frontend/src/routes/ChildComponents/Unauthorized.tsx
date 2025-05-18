import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
        backgroundSize: "cover",
      }}
    >
      <Typography
        color={"#6F00FF"}
        fontSize={"6em"}
        fontFamily={"Outfit-ExtraBold"}
      >
        404
      </Typography>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Typography fontSize={"2em"} fontFamily={"Outfit-Regular"}>
          Unauthorized
        </Typography>
      </Box>
      <Typography fontSize={"1em"} fontFamily={"Outfit-Regular"}>
        Go back to <Link to="/home">home page</Link>
      </Typography>
    </Box>
  );
};

export default Unauthorized;
