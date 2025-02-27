import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

// Define a type for the slice state
interface AuthState {
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  token: localStorage.getItem("token") || "",
  isAuthenticated: Boolean(localStorage.getItem("token")),
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
    setTokens: (
      state,
      action: PayloadAction<{ token: string}>
    ) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    resetTokens: (state) => {
      state.token = "";
      state.isAuthenticated = false;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = "";
      state.isAuthenticated = false;
      state.loading = false;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchPending, (state) => {
        state.loading = true;
        return state;
      })
      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {      
        const data = action.payload;        
        localStorage.setItem("token", data);
        state.token = data.token;
        state.isAuthenticated = true;
        state.loading = false;
        return state;
      })
      .addMatcher(api.endpoints.login.matchRejected, (state) => {
        state.token = "";
        state.isAuthenticated = false;
        state.loading = false;
        return state;
      })
      .addMatcher(api.endpoints.me.matchFulfilled, 
        (state) => {
          return state;
        }
      )
  },
});

export const { setLoading, setTokens, resetTokens, logout } = authSlice.actions;

export default authSlice.reducer;