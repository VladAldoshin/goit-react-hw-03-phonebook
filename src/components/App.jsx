import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import './App.module.css';

class App extends Component {
state = {
contacts: JSON.parse(localStorage.getItem('contacts')) || [],
filter: ''
};
componentDidUpdate() {
    const { contacts } = this.state;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

handleFormSubmit = (name, number) => {
const { contacts } = this.state;

const isContactExists = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (isContactExists) {
      alert(`${name} or ${number} is already in contacts`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number
      };

      this.setState((prevState) => ({
        contacts: [newContact, ...prevState.contacts]
      }));
    }
  };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  handleContactDelete = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id)
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <section>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleFormSubmit} />
        <h2>Contacts</h2>
        <Filter filter={filter} changeFilterInput={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.handleContactDelete}
        />
      </section>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string
};

export default App;

