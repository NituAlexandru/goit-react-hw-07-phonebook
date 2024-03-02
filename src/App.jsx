import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import ContactForm from "../src/components/ContactForm/ContactForm";
import ContactList from "../src/components/ContactList/ContactList";
import Filter from "../src/components/Filter/Filter";
import Notiflix from "notiflix";
import styles from "./App.module.css";
import { addContact, deleteContact } from "../src/redux/contactsSlice";
import { setFilter } from "../src/redux/filterSlice";

const App = () => {
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleAddContact = (name, number) => {
    const normalizedInputName = name.toLowerCase();
    const isContactExist = contacts.some(
      (contact) => contact.name.toLowerCase() === normalizedInputName
    );

    if (isContactExist) {
      Notiflix.Notify.failure(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(addContact(newContact));
    Notiflix.Notify.success(`${name} added to contacts.`);
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
    Notiflix.Notify.success("Contact deleted successfully");
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const getFilteredContacts = () => {
    const lowercasedFilter = filter.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowercasedFilter) ||
        contact.number.includes(filter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
