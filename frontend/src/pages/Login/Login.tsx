import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../features/hooks";
import { loginUserThunk } from "../../features/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../routes/constants";

const Login = () => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    const result = await dispatch(loginUserThunk({ email, password }));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/attempts");
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      p={2}
      gap={16}
    >
      <Typography
        fontFamily={"Segoe UI"}
        fontWeight={"bold"}
        letterSpacing={2}
        variant="h2"
        color={theme.palette.primary.main}
      >
        Phishing Management
      </Typography>

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        p={2}
        gap={2}
      >
        <Typography
          fontFamily={"Segoe UI"}
          fontWeight={400}
          letterSpacing={2}
          variant="h5"
          color={theme.palette.primary.main}
        >
          Login
        </Typography>
        <TextField
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ borderRadius: "12px" }}
          onClick={handleLogin}
        >
          login
        </Button>
      </Box>
      <Typography>
        <Link to={PublicRoutes.SIGNUP}>Signup</Link>
      </Typography>
    </Box>
  );
};

export default Login;
