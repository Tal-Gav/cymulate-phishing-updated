import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PublicRoutes } from "../constants";

const PageNotFound = () => {
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
      <Typography
        color={"#6F00FF"}
        fontSize={"2em"}
        fontFamily={"Outfit-Regular"}
      >
        Page not found :(
      </Typography>
      <Typography
        color={"#6F00FF"}
        fontSize={"1em"}
        fontFamily={"Outfit-Regular"}
      >
        Go back to{" "}
        <Link to={PublicRoutes.LOGIN} style={{ color: "#6F00FF" }}>
          home page
        </Link>
      </Typography>
    </Box>
  );
};

export default PageNotFound;
