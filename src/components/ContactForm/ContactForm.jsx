import React, { useState } from "react";
import propTypes from "prop-types";
import styles from "./ContactForm.module.css";

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value.replace(/[^a-zA-Z '-]/g, ""));
        break;
      case "phone":
        setPhone(value.replace(/[^\d+() -]/g, ""));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddContact(name, phone);
    setName("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        <p>Name: </p>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
        <p>Phone: </p>
        <input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: propTypes.func.isRequired,
};

export default ContactForm;
