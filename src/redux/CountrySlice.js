import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const fetchCountry = createAsyncThunk(
  "country/fetchCountry",
  async (countryCode) => {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );
    const data = await response.json();
    return data;
  }
);

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountry.pending, (state) => {
        state.status = "loading";
        state.entities = [];
      })
      .addCase(fetchCountry.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(fetchCountry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default countrySlice.reducer;
