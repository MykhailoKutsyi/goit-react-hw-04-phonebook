import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    contacts.some(({ name }) => name === newContact.name)
      ? Notify.failure(`Contact ${newContact.name} already exists`)
      : setContacts(state => [...state, newContact]);
  };

  const getFilterValue = e => {
    setFilter(e.currentTarget.value);
  };

  function filteredContacts() {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizeFilter) ||
        contact.number.includes(normalizeFilter)
    );
  }

  function deleteContact(contactId) {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  }

  const filtered = filteredContacts();

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h1>Contacts</h1>
      <Filter value={filter} changeFilter={getFilterValue} />
      <ContactList contacts={filtered} onDeleteContact={deleteContact} />
    </>
  );
}
