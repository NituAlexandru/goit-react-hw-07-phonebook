import axios from "axios";

const BASE_URL = "https://65e326e088c4088649f5677f.mockapi.io/api/v1";

const api = {
  fetchContacts: () => axios.get(`${BASE_URL}/contacts`),
  addContact: (contact) => axios.post(`${BASE_URL}/contacts`, contact),
  deleteContact: (contactId) =>
    axios.delete(`${BASE_URL}/contacts/${contactId}`),
};

export default api;
