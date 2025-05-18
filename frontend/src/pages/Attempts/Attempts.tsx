import {
  Box,
  Button,
  IconButton,
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
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const Attempts = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { attempts, loading } = useAppSelector((state) => state.attempt);
  const { user } = useAppSelector((state) => state.auth);
  const [targetEmail, setTargetEmail] = useState("");
  const navigate = useNavigate();

  const getAttempts = async () => {
    dispatch(getAttemptsThunk(user.id));
  };
  const handleSendAttempt = () => {
    dispatch(sendAttemptThunk({ targetEmail, id: user.id }));
  };
  const handleLogout = async () => {
    const result = await dispatch(logoutUserThunk());
    if (result.meta.requestStatus === "fulfilled") navigate("/");
  };
  const handleAttemptDelete = (id: string) => {
    dispatch(deleteAttemptThunk(id));
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
      {!loading && attempts.length > 0 && (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          p={2}
          gap={2}
        >
          {attempts.map((attempt) => (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              flexDirection={"column"}
              p={2}
              key={attempt._id}
              sx={{
                border: "1px solid black",
                borderRadius: "12px",
              }}
            >
              <Typography>Target Case ID: {attempt._id}</Typography>
              <Typography>Target Email: {attempt.email}</Typography>
              <Typography>
                Is Clicked URL: {attempt.isClickedUrl ? "Yes" : "No"}
              </Typography>
              <Typography>
                Clicked URL At:{" "}
                {attempt.clickedUrlTime
                  ? new Date(attempt.clickedUrlTime).toLocaleString()
                  : "-"}
              </Typography>
              <Typography>
                Created At: {new Date(attempt.createdAt).toLocaleString()}
              </Typography>
              <IconButton onClick={() => handleAttemptDelete(attempt._id)}>
                <DeleteForeverOutlinedIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Attempts;
