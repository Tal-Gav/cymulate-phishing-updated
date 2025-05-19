import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  IconButton,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { deleteAttemptThunk } from "../../features/features/attemptSlice";

const TableView = () => {
  const dispatch = useAppDispatch();
  const { attempts, loading } = useAppSelector((state) => state.attempt);

  const handleAttemptDelete = (id: string) => {
    dispatch(deleteAttemptThunk(id));
  };

  return (
    !loading &&
    attempts.length > 0 && (
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Is Clicked Url</TableCell>
            <TableCell align="left">Clicked URL Time</TableCell>
            <TableCell align="left">Creation Time</TableCell>
            <TableCell align="left">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attempts.map((attempt) => (
            <TableRow key={attempt._id}>
              <TableCell align="left">{attempt._id}</TableCell>
              <TableCell align="left">{attempt.email}</TableCell>
              <TableCell align="left">
                {attempt.isClickedUrl ? "Yes" : "No"}
              </TableCell>
              <TableCell align="left">
                {attempt.clickedUrlTime
                  ? new Date(attempt.clickedUrlTime).toLocaleString()
                  : "-"}
              </TableCell>
              <TableCell align="left">
                {new Date(attempt.createdAt).toLocaleString()}
              </TableCell>
              <TableCell align="left">
                <IconButton onClick={() => handleAttemptDelete(attempt._id)}>
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  );
};

export default TableView;
