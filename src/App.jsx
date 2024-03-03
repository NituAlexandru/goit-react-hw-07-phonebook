import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactForm from "../src/components/ContactForm/ContactForm";
import ContactList from "../src/components/ContactList/ContactList";
import Filter from "../src/components/Filter/Filter";
import Notiflix from "notiflix";
import styles from "./App.module.css";
import {
  fetchContacts,
  addContact,
  deleteContact,
} from "../src/redux/contactsSlice";
import { setFilter } from "../src/redux/filterSlice";

const App = () => {
  const {
    items: contacts,
    isLoading,
    error,
  } = useSelector((state) => state.contacts);
  console.log(contacts);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (name, phone) => {
    const normalizedInputName = name.toLowerCase();
    const isContactExist = contacts.some(
      (contact) => contact.name.toLowerCase() === normalizedInputName
    );

    if (isContactExist) {
      Notiflix.Notify.failure(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      name,
      phone,
    };

    dispatch(addContact(newContact));
    Notiflix.Notify.success(`${name} added to contacts.`);
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
    Notiflix.Notify.success("Contact deleted successfully.");
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const getFilteredContacts = () => {
    if (!contacts || !Array.isArray(contacts)) return [];
    const lowercasedFilter = filter.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowercasedFilter) ||
        contact.phone.includes(lowercasedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      {isLoading && <p>Loading...</p>}
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
