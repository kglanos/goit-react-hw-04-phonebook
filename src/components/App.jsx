import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState([
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]);
    const [filter, setFilter] = useState('');

    const addContactOnSubmit = (name, number) => {
      const isContactExist = contacts.some(
        (contact) => contact.name.toLowerCase() === name.toLowerCase(),
      );

      if (isContactExist) {
        alert(`${name} is already in contacts`);
        return;
      }
      
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
    

      setContacts((prevContacts) => [...prevContacts, newContact]);
    };

      const deleteContact = (contactId) => {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.id !== contactId),
        );
      };

      const onFilterChange = (e) => {
        setFilter(e.currentTarget.value);
      };

      const getVisibleContacts = () => {
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter((contact) =>
          contact.name.toLowerCase().includes(normalizedFilter),
        );
      };

      useEffect(() => {
        const storedContacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(storedContacts);

        if (parsedContacts) {
          setContacts(parsedContacts);
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }, [contacts]);

      const visibleContacts = getVisibleContacts();

      return (
      <>
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContactOnSubmit} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={onFilterChange} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact} />
      </div>
      </>
    );
  };

export default App;