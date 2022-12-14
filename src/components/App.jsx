import { Component } from "react";
import { nanoid } from "nanoid";

import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

import css from './App.module.css';


export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    };
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    };
  };

  formSubmitHandler = ({ name, number }) => {
    const availabilityCheck = this.checkContact(name);

    if (availabilityCheck !== undefined) {
      alert(`${name} is already in contacts.`);
      return;
    };

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    this.setState(prevState => {
      return {
        contacts: [newContact, ...prevState.contacts],
      };
    });
  };

  checkContact = (name) => {
    return this.state.contacts.find(contact => {
      return contact.name === name;
    });  
  };

  changeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    })
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    })
  }

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <>
        <h1 className={css.phonebook__title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2 className={css.contacts__title}>Contacts</h2>
        <Filter
          value={this.state.filter}
          onChange={this.changeFilter}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  } 
};
