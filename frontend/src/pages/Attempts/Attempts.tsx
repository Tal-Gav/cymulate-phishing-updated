import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {
  deleteAttemptThunk,
  getAttemptsThunk,
  sendAttemptThunk,
} from "../../features/features/attemptSlice";
import { useEffect, useState } from "react";
import { logoutUserThunk } from "../../features/features/authSlice";
import { useNavigate } from "react-router-dom";
import TableView from "./TableView";
import SquareView from "./SquareView";

const Attempts = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const [targetEmail, setTargetEmail] = useState("");
  const [isSquareView, setIsSquareView] = useState(false);
  const navigate = useNavigate();

  const getAttempts = async () => {
    dispatch(getAttemptsThunk(user.id));
  };
  const handleSendAttempt = () => {
    dispatch(sendAttemptThunk({ targetEmail, userId: user.id }));
  };
  const handleLogout = async () => {
    const result = await dispatch(logoutUserThunk());
    if (result.meta.requestStatus === "fulfilled") navigate("/");
  };

  useEffect(() => {
    getAttempts();
  }, []);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      p={2}
      gap={4}
    >
      <Typography
        fontFamily={"Segoe UI"}
        fontWeight={"bold"}
        letterSpacing={2}
        variant="h2"
        color={theme.palette.primary.main}
      >
        Phishing Attempts
      </Typography>

      <Typography
        fontFamily={"Segoe UI"}
        fontWeight={400}
        letterSpacing={2}
        variant="h5"
        color={theme.palette.primary.main}
      >
        Send phishing attempt
      </Typography>
      <Button
        variant="outlined"
        onClick={handleLogout}
        sx={{ borderRadius: "12px", position: "absolute", top: 6, left: 6 }}
      >
        Logout
      </Button>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"row"}
        p={2}
        gap={2}
      >
        <TextField
          placeholder="Target Email Address"
          value={targetEmail}
          onChange={(e) => setTargetEmail(e.target.value)}
        />
        <Button variant="contained" onClick={handleSendAttempt}>
          send
        </Button>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
      >
        <Typography letterSpacing={2} color={theme.palette.primary.main}>
          Table
        </Typography>
        <Switch
          checked={isSquareView}
          onClick={() => setIsSquareView((prev) => !prev)}
          name="isSquareView"
        />

        <Typography letterSpacing={2} color={theme.palette.primary.main}>
          Square
        </Typography>
      </Box>

      {isSquareView ? <SquareView /> : <TableView />}
    </Box>
  );
};

export default Attempts;
