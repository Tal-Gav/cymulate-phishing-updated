import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { deleteAttempt, getAttempts, sendAttempt } from "../../api/attempts";

export interface Target {
  _id: string;
  email: string;
  isClickedUrl: boolean;
  clickedUrlTime: string | number | Date;
  createdAt: string | number | Date;
}

export interface AttemptState {
  attempts: Array<Target>;
  loading: boolean;
}

const initialState: AttemptState = {
  attempts: [],
  loading: false,
};

export const getAttemptsThunk = createAsyncThunk(
  "attempt/get",
  async (id: string, thunkAPI) => {
    try {
      const response = await getAttempts(id);

      return response;
    } catch (error: any) {
      toast.error("Error fetching targets");
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const deleteAttemptThunk = createAsyncThunk(
  "attempt/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await deleteAttempt(id);
      toast.success("Attempt deleted successfully");
      return id;
    } catch (error: any) {
      toast.error("Error deleting attempt");
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const sendAttemptThunk = createAsyncThunk(
  "attempt/send",
  async (
    { targetEmail, userId }: { targetEmail: string; userId: string },
    thunkAPI
  ) => {
    try {
      const response = await sendAttempt(targetEmail, userId);
      toast.success("Email sent to the target");
      return response;
    } catch (error: any) {
      toast.error("Error sending email");
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const attemptSlice = createSlice({
  name: "attempt",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAttemptsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAttemptsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.attempts = action.payload;
      })
      .addCase(getAttemptsThunk.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(sendAttemptThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.attempts.push(action.payload);
      })
      .addCase(sendAttemptThunk.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteAttemptThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.attempts = state.attempts.filter(
          (attempt) => attempt._id !== action.payload
        );
      });
  },
});

export const {} = attemptSlice.actions;

export default attemptSlice.reducer;
