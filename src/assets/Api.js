import axios from "axios";

const BASE_URL = "https://65e326e088c4088649f5677f.mockapi.io/api/v1";

const api = {
  fetchContacts: async () => {
    const response = await axios.get(`${BASE_URL}/contacts`);
    return response.data;
  },
  addContact: async (contact) => {
    const response = await axios.post(`${BASE_URL}/contacts`, contact);
    console.log("addContact response:", response);
    return response.data;
  },
  deleteContact: async (contactId) => {
    const response = await axios.delete(`${BASE_URL}/contacts/${contactId}`);
    console.log("deleteContact response:", response);
    return response.data;
  },
};

export default api;
