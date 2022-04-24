import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addContact(state, action) {
      state = state.push(action.payload);
      toast.success(`${action.payload.name} was added to contacts!`);
    },

    removeContact(state, action) {
      state = state.filter((item) => item.id !== action.payload.id);
      toast.success(`Contact ${action.payload.name} was deleted!`);
      return state;
    },
  },
});

export const { addContact, removeContact } = itemsSlice.actions;

export const getItems = (state) => state.contacts.items;
