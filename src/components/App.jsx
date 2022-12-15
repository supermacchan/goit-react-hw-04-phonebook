import { useState } from "react";
import { nanoid } from "nanoid";

import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import { useLocalStorage } from "hooks/useLocalStorage";

import css from './App.module.css';


export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', [])
  const [filter, setFilter] = useState('');

  const formSubmitHandler = ({ name, number }) => {
    const availabilityCheck = checkContact(name);

    if (availabilityCheck !== undefined) {
      alert(`${name} is already in contacts.`);
      return;
    };

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts(prevState => {
      return [newContact, ...prevState];
    });

  };

  const checkContact = (name) => {
    return contacts.find(contact => {
      return contact.name === name;
    });  
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  }

    return (
      <>
        <h1 className={css.phonebook__title}>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />

        <h2 className={css.contacts__title}>Contacts</h2>
        <Filter
          value={filter}
          onChange={changeFilter}
        />
        <ContactList
          contacts={getFilteredContacts()}
          onDeleteContact={deleteContact}
        />
      </>
    );
};
