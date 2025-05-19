import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { deleteAttemptThunk } from "../../features/features/attemptSlice";

const SquareView = () => {
  const dispatch = useAppDispatch();
  const { attempts, loading } = useAppSelector((state) => state.attempt);

  const handleAttemptDelete = (id: string) => {
    dispatch(deleteAttemptThunk(id));
  };
  console.log(attempts);

  return (
    !loading &&
    attempts.length > 0 && (
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
              Created At:{" "}
              {attempt.createdAt
                ? "-"
                : new Date(attempt.createdAt).toLocaleString()}
            </Typography>
            <IconButton onClick={() => handleAttemptDelete(attempt._id)}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    )
  );
};

export default SquareView;
