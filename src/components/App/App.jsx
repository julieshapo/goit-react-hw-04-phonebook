import { GlobalStyle } from 'components/GlobalStyle';
import { Layout } from 'components/Layout/Layout';
import { useState, useEffect } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import initialContacts from '../contacts.json';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { nanoid } from 'nanoid';

import toast, { Toaster } from 'react-hot-toast';

const getInitialContacts = () => {
  const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
  if (parsedContacts) {
    return parsedContacts;
  } else {
    return initialContacts;
  }
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [query, setQuery] = useState('');

  const addContact = (contact, name) => {
    if (contacts.find(contact => contact === contact.name)) {
      toast.error(`${name} is already in contacts.`);
      return;
    }
    const newContact = { ...contact, id: nanoid() };
    setContacts(prevState => [...prevState.contacts, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const findContact = e => {
    setQuery(e.currentTarget.value.toLocaleLowerCase().trim());
  };

  useEffect(() => {
    setContacts(localStorage.setItem('contacts', JSON.stringify(contacts)));
  }, [contacts]);

  const contactsToShow = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(query)
  );

  return (
    <Layout>
      <ContactForm onAdd={addContact} />
      <Filter value={query} onChange={findContact} />
      <ContactsList contacts={contactsToShow} onDelete={deleteContact} />
      <GlobalStyle />
      <Toaster />
    </Layout>
  );
};

// export class App2 extends Component {
//   state = {
//     contacts: initialContacts,
//     // contacts: [],
//     filter: '',
//   };

// addContact = (contact, name) => {
//   if (this.state.contacts.find(contact => contact.name === name)) {
//     toast.error(`${name} is already in contacts.`);
//     return;
//   } else {
//     const newContact = { ...contact, id: nanoid() };
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, newContact],
//     }));
//   }
// };

// deleteContact = contactId => {
//   this.setState(prevState => ({
//     contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//   }));
// };

// findContact = evt => {
//   this.setState({
//     filter: evt.currentTarget.value.toLocaleLowerCase().trim(),
//   });
// };

// componentDidMount() {
//   const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
//   if (parsedContacts) {
//     this.setState({ contacts: parsedContacts });
//   }
// }

// componentDidUpdate(prevProps, prevState) {
//   if (this.state.contacts !== prevState.contacts) {
//     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }
// }

//   render() {
//     const {
//       addContact,
//       findContact,
//       deleteContact,
//       state: { filter, contacts },
//     } = this;

//     const contactsToShow = contacts.filter(contact =>
//       contact.name.toLocaleLowerCase().includes(filter)
//     );

//     return (
//       <Layout>
//         <ContactForm onAdd={addContact} />
//         <Filter value={filter} onChange={findContact} />
//         <ContactsList contacts={contactsToShow} onDelete={deleteContact} />
//         <GlobalStyle />
//         <Toaster />
//       </Layout>
//     );
//   }
// }
