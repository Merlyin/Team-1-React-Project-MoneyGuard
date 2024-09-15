import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://wallet.b.goit.study/api';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
<<<<<<< Updated upstream
      const response = await axios.post('/users/register', credentials);

=======
      const response = await axios.post('/auth/sign-up', credentials);
>>>>>>> Stashed changes
      setAuthHeader(response.data.token);

      if (response.data && response.status === 201) {
        toast.success(
          `Welcome to Money Guard, ${response.data.user.name}!`,
          {
            autoClose: 1200,
          }
        );
      }

      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error('Email is already in use!', {
            position: 'top-right',
            autoClose: 1200,
          });
          return rejectWithValue(error.message);
        } else {
          toast.error(
            `Registration failed: ${
              error.response.data.message || 'An error occurred.'
            }`,
            {
              position: 'top-right',
              autoClose: 1200,
            }
          );
          return rejectWithValue(error.response.data.message || error.message);
        }
      } else {
        toast.error(`Registration failed: ${error.message}`, {
          position: 'top-right',
          autoClose: 1200,
        });
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/sign-in', credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      toast.error(
        `Login failed: ${error.response?.data?.message || error.message}`,
        {
          position: 'top-right',
          autoClose: 1200,
        }
      );
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/users/logout');
      clearAuthHeader();
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`, {
        position: 'top-right',
        autoClose: 1200,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
