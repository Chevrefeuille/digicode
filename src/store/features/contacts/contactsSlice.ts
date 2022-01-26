import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getContacts } from "../../../services/contacts.service";
import * as Contacts from "expo-contacts";

export interface ContactsState {
  contacts: Contacts.Contact[];
  displayedContacts: Contacts.Contact[];
  registeredContacts: Contacts.Contact[];
}

const initialState: ContactsState = {
  contacts: [],
  displayedContacts: [],
  registeredContacts: [],
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const contacts = await getContacts();
    return contacts;
  }
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setDisplayedContacts: (
      state,
      action: PayloadAction<Contacts.Contact[]>
    ) => {
      state.displayedContacts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.registeredContacts = state.contacts.filter(
        (contact) => contact.note
      );
      state.displayedContacts = state.registeredContacts;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setDisplayedContacts } = contactsSlice.actions;

export default contactsSlice.reducer;
