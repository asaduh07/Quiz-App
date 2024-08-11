import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Async thunk to fetch tags from the server
export const fetchTags = createAsyncThunk(
  'quiz/fetchTags',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/tags`);
      const data = response.data;
      if (data.success) {
        return data.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.data);  // Handle error
    }
  }
);

// Async thunk to fetch questions based on selected tags
export const fetchQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async (payload, { rejectWithValue }) => {
    try {
      const { selectedTags } = payload;
      const response = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/questions/filter`, { selectedTags });
      const data = response.data;

      // If API call is successful, return the data
      if (data.success) {
        return data.data;
      }
    } catch (error) {
      // Handle unexpected errors, e.g., network issues
      return rejectWithValue(error.response?.data?.error || 'An error occurred');
    }
  }
);