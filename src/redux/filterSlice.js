import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilterValue(state, action) {
      return action.payload;
    },

    resetFilter(state) {
      return "";
    },
  },
});

export const { setFilterValue, resetFilter } = filterSlice.actions;

export const getFilterValue = (state) => state.contacts.filter;
