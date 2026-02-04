import { createSlice } from "@reduxjs/toolkit";

const savedAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = {
  token: savedAuth?.token || null,
  user: savedAuth?.user || null,
  isAuth: Boolean(savedAuth?.token) || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuth = true;

      localStorage.setItem("auth", JSON.stringify({
        token: state.token,
        user: state.user,
      }));
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuth = false;

      localStorage.removeItem("auth");
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
