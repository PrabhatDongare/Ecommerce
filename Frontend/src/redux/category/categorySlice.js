import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { toast } from 'react-toastify';

const baseUrl = "http://localhost:3000/"
// SHOW CATEGORY
export const fetchShowCategory = createAsyncThunk("fetchShowCategory", async (pageNo , { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
        };
        const response = await axios.get(`${baseUrl}api/category/show?page=${pageNo}`, { headers });
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

// CHECKBOX CHECKED
export const fetchEditAddCategory = createAsyncThunk("fetchEditAddCategory", async (categoryId, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
          };
        const response = await axios.post(`${baseUrl}api/category/editAdd?categoryId=${categoryId}`, {}, { headers });
        if (response.status === 200) {
            return categoryId;
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

// REMOVE CHECKED
export const fetchEditDeleteCategory = createAsyncThunk("fetchEditDeleteCategory", async (categoryId, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
          };
        const response = await axios.delete(`${baseUrl}api/category/editDelete?categoryId=${categoryId}`, { headers });
        if (response.status === 200) {
            return categoryId;
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

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        interests: [],
        category: [],
        page: 1,
        signUpUserEmail: '',
    },

    reducers: {
        setEmail: (state, action) => {
            state.signUpUserEmail = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchShowCategory.fulfilled, (state, action) => {
                const { page, category, interestsArray } = action.payload
                state.page = page
                state.category = category.map(categoryRow => {
                    return { id: categoryRow.id, categoryName: categoryRow.categoryName }
                })
                state.interests.sort((a, b) => a - b)
                state.interests = interestsArray
            })
            .addCase(fetchShowCategory.rejected, (state, action) => {
                toast.error(action.payload)
            })
            

            .addCase(fetchEditAddCategory.fulfilled, (state, action) => {
                state.interests.push(action.payload)
            })
            .addCase(fetchEditAddCategory.rejected, (state, action) => {
                toast.error(action.payload)
            })
            

            .addCase(fetchEditDeleteCategory.fulfilled, (state, action) => {
                state.interests = state.interests.filter(id => id !== action.payload )
            })
            .addCase(fetchEditDeleteCategory.rejected, (state, action) => {
                toast.error(action.payload)
            })
    }
})

export const { setEmail } = categorySlice.actions
export default categorySlice.reducer
