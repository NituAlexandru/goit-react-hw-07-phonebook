import React from "react";
import { useSelector } from "react-redux";
import ContactItem from "../ContactItem/ContactItem";
import styles from "./ContactList.module.css";

const ContactList = ({ onDeleteContact }) => {
  const { items: contacts } = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
  console.log(contacts);

  const filteredContacts =
    contacts && Array.isArray(contacts)
      ? contacts.filter((contact) =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      : [];

  return (
    <ul className={styles.list}>
      {filteredContacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDeleteContact={() => onDeleteContact(contact.id)}
        />
      ))}
    </ul>
  );
};

export default ContactList;
