import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

// Define your async thunk for blocking a user
export const deleteAccountAsync = createAsyncThunk(
  'user/deleteAccountAsync',
  async (userId) => { 
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/user/deleteaccount/${userId}`);
      return response.data;
    } catch (error) {
      toast.error("Failed to delete user. Please try again later.");
      throw error; // Throw error for proper rejection handling
    }
  }
);

// Update the API endpoint names to match your backend routes
const blockUserEndpoint = `${process.env.REACT_APP_SERVERURL}/user/blockuser`;
const unblockUserEndpoint = `${process.env.REACT_APP_SERVERURL}/user/unblockuser`;

export const blockUserAsync = createAsyncThunk(
  'user/blockUserAsync',
  async (userId) => {
    try {
      const response = await axios.patch(`${blockUserEndpoint}/${userId}`);
      toast.success(`User with id: ${userId} blocked successfully!`);
      return response.data;
    } catch (error) {
      toast.error(`Error blocking user: ${error.message}`);
      throw error;
    }
  }
);

export const unblockUserAsync = createAsyncThunk(
  'user/unblockUserAsync',
  async (userId) => {
    try {
      const response = await axios.patch(`${unblockUserEndpoint}/${userId}`);
      toast.success(`User with id: ${userId} unblocked successfully!`);
      return response.data;
    } catch (error) {
      toast.error(`Error unblocking user: ${error.message}`);
      throw error;
    }
  }
);

// Define your async thunk for fetching all users
export const fetchUsersAsync = createAsyncThunk(
  'user/fetchUsersAsync',
  async () => {
    try {
      console.log("Fetching users...");
      const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/user`);
      console.log("Users fetched successfully:", response.data.users);
      return response.data.users; // Return the fetched users array
    } catch (error) {
      console.error("Error fetching users:", error.message);
      throw error;
    }
  }
);

const initialState = {
  userList: [],
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload; // Update userList with fetched users
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(blockUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Update the userList if necessary
      })
      .addCase(blockUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(unblockUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unblockUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Update the userList if necessary
      })
      .addCase(unblockUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAccountAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccountAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Update state as needed after successful deletion
      })
      .addCase(deleteAccountAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const userMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("user/")) {
    const userList = store.getState().users.userList || []; // Update slice name to 'users'
    localStorage.setItem("userList", JSON.stringify(userList));
  }
  return result;
};


export default userSlice.reducer;
