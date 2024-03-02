import axios from "axios";

const BASE_URL = "https://65e326e088c4088649f5677f.mockapi.io/api/v1";

const api = {
  fetchContacts: () => {
    return axios.get(`${BASE_URL}/contacts`).then((response) => {
      console.log("fetchContacts response:", response);
      return response;
    });
  },
  addContact: (contact) => {
    return axios.post(`${BASE_URL}/contacts`, contact).then((response) => {
      console.log("addContact response:", response);
      return response;
    });
  },
  deleteContact: (contactId) => {
    return axios
      .delete(`${BASE_URL}/contacts/${contactId}`)
      .then((response) => {
        console.log("deleteContact response:", response);
        return response;
      });
  },
};

export default api;
