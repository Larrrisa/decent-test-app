import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./AllCountriesSlice";
import countryReducer from "./CountrySlice";

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    country: countryReducer,
  },
});

export default store;
