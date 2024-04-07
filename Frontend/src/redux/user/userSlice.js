import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { toast } from 'react-toastify';

// LOGIN
const baseUrl = "http://localhost:3000/"
export const fetchUserLogin = createAsyncThunk("fetchUserLogin", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}api/auth/login`, { email, password });
        return response.data;

    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data.message);
        }
        else {
            return rejectWithValue("Something went wrong");
        }
    }
});

// GET OTP
export const fetchUserSignUp = createAsyncThunk("fetchUserSignUp", async ({ name, email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}api/auth/signup`, { name, email, password });
        if (response.status === 200) {
            return response.data;      // check for its return value
        }  

    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data.message);
        }
        else {
            return rejectWithValue("Something went wrong");
        }
    }
});

// VERIFY OTP
export const fetchUserVerifyOtp = createAsyncThunk("fetchUserVerifyOtp", async ({ otp }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}api/auth/verifyOtp`, { otp });
        return response.data;

    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data.message);
        }
        else {
            return rejectWithValue("Something went wrong");
        }
    }
});



export const userSlice = createSlice({
    name: 'user',
    initialState: { todos: "" },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserLogin.fulfilled, (state, action) => {
                const { success, authToken } = action.payload
                if (success) {
                    localStorage.setItem('token', authToken)
                }
            })
            .addCase(fetchUserLogin.rejected, (state, action) => {
                toast.error(action.payload)
            })


            .addCase(fetchUserSignUp.fulfilled, (state, action) => {
                toast.success(action.payload.message)
                return true
            })
            .addCase(fetchUserSignUp.rejected, (state, action) => {
                toast.error(action.payload)
                return false
            })
        

            .addCase(fetchUserVerifyOtp.fulfilled, (state, action) => {
                const { success, authToken } = action.payload
                if (success) {
                    localStorage.setItem('token', authToken)
                }
                return success
            })
            .addCase(fetchUserVerifyOtp.rejected, (state, action) => {
                toast.error(action.payload)
            })
    }
})


export default userSlice.reducer
