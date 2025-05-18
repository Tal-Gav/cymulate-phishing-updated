import { Box } from "@mui/material";
import Title from "../../components/Title";

const Home = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      p={2}
    >
      <Title />
    </Box>
  );
};

export default Home;
