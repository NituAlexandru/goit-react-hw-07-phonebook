import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../assets/Api";

// Thunks
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    try {
      const response = await api.fetchContacts();
      console.log("Răspuns API pentru fetchContacts:", response);
      return response.data;
    } catch (error) {
      console.error("Eroare la fetchContacts:", error);
      throw error;
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact) => {
    const response = await api.addContact(contact);
    console.log("Răspuns API pentru addContact:", response);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId) => {
    const response = await api.deleteContact(contactId);
    console.log("Răspuns API pentru deleteContact:", response);
    return contactId;
  }
);

const initialState = {
  contacts: [],
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );
      });
  },
});

export default contactsSlice.reducer;
