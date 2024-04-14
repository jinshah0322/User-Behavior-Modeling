import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

// Define your async thunk for blocking a user
export const blockUserAsync = createAsyncThunk(
  'user/blockUserAsync',
  async (userId) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVERURL}/user/block/${userId}`);
      toast.success(`User with id: ${userId} blocked successfully!`);
      return response.data; // Return the blocked user data if needed
    } catch (error) {
      toast.error(`Error blocking user: ${error.message}`);
      throw error;
    }
  }
);

// Define your async thunk for unblocking a user
export const unblockUserAsync = createAsyncThunk(
  'user/unblockUserAsync',
  async (userId) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVERURL}/user/unblock/${userId}`);
      toast.success(`User with id: ${userId} unblocked successfully!`);
      return response.data; // Return the unblocked user data if needed
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

// Define your async thunk for deleting a user account
export const deleteAccountAsync = createAsyncThunk(
  'user/deleteAccountAsync',
  async (_, { getState }) => {
    try {
      const userId = getState().auth.userId; // Assuming auth slice contains user info
      const response = await axios.delete(`${process.env.REACT_APP_SERVERURL}/user/deleteaccount/${userId}`);
      // Dispatch success action if deletion is successful
      return response.data;
    } catch (error) {
      // Dispatch error action if deletion fails
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
