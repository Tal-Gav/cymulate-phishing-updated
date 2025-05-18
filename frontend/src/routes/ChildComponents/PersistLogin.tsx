import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { refreshTokenThunk } from "../../features/features/authSlice";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const result = await dispatch(refreshTokenThunk());
        if (result.meta.requestStatus !== "fulfilled") {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth.accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, [auth.accessToken, dispatch, navigate]);

  return isLoading ? (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      loading...
    </Box>
  ) : (
    <Outlet />
  );
};

export default PersistLogin;
