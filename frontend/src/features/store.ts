import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import attemptReducer from "./features/attemptSlice";
export type ExtraArg = {
  navigate: (path: string) => void;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    attempt: attemptReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          navigate: (path: string) => {}, // Placeholder; you'll pass the real function later
        } as ExtraArg,
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
