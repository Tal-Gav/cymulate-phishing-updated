import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { createUserThunk } from "../../features/features/authSlice";
import { useAppDispatch } from "../../features/hooks";
import { PublicRoutes } from "../../routes/constants";

const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const dispatch = useAppDispatch();
  const handleSignUp = async () => {
    if (password === confirmPassword) {
      const result = await dispatch(createUserThunk({ email, password }));
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/attempts");
      }
    } else {
      toast.error("Passwords don't match!");
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
          Sign Up
        </Typography>
        <TextField
          fullWidth
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type={showConfirmPassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showConfirmPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          variant="contained"
          sx={{ borderRadius: "12px" }}
          onClick={handleSignUp}
        >
          SignUp
        </Button>
      </Box>
      <Typography>
        <Link to={PublicRoutes.LOGIN}> Login</Link>
      </Typography>
    </Box>
  );
};

export default SignUp;
