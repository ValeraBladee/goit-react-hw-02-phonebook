import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  Section,
  ContactAddForm,
  ContactAddFormInput,
  ContactAddFormButton,
  ContactsList,
  ContactsListItem,
} from 'components';
import { nanoid } from 'nanoid';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', tel: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', tel: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', tel: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', tel: '227-91-26' },
    ],
    filter: '',
  };
  getFilteredData = (dataContacts, filterValue) => {
    if (dataContacts.length === 0 || !filterValue) {
      return;
    }
    const filteredData = dataContacts.filter(item =>
      item.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    return filteredData;
  };
  getContactList = (dataContacts, filterValue = null) => {
    if (!dataContacts.length) {
      return [];
    }
    return filterValue
      ? this.getFilteredData(dataContacts, filterValue)
      : dataContacts;
  };
  resetForm = (refName, refTel) => {
    refName.value = '';
    refTel.value = '';
    return;
  };

  createContactObj = (valueName, valueTel) => {
    return { name: valueName, tel: valueTel, id: nanoid() };
  };

  checkAddDoubleContact = name => {
    const check = this.state.contacts.find(item => item.name === name);
    return check ? true : false;
  };

  onFilterInput = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  onSubmitButtonContactAdd = e => {
    e.preventDefault();
    const inputRef = e.target.elements;

    const checkDoubleContact = this.checkAddDoubleContact(inputRef.name.value);

    if (checkDoubleContact) {
      Notify.failure(
        `The contact ${inputRef.name.value} has already been added before`
      );
      this.resetForm(inputRef.name, inputRef.tel);
      return;
    }

    const contactObj = this.createContactObj(
      inputRef.name.value,
      inputRef.tel.value
    );

    this.setState({
      contacts: [...this.state.contacts, { ...contactObj }],
      filter: '',
    });
    Notify.success(`The contact ${inputRef.name.value} successfully added`);
    this.resetForm(inputRef.name, inputRef.tel);
    return;
  };
  onContactDeleteButtonClick = e => {
    const deleteContactId = e.target.dataset.id;
    const newArray = this.state.contacts.filter(
      item => item.id !== deleteContactId
    );
    this.setState({ contacts: newArray });

    Notify.success(`Contact deleted successfully`);
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <ContactAddForm
            onSubmitButtonContactAdd={this.onSubmitButtonContactAdd}
          >
            <ContactAddFormInput type="text" name="name" />
            <ContactAddFormInput type="tel" name="tel" />
            <ContactAddFormButton type="submit" text="Add contact" />
          </ContactAddForm>
        </Section>
        <Section title="Contacts">
          <ContactAddFormInput
            type="text"
            name="filter"
            onFilterInput={this.onFilterInput}
          />

          <ContactsList>
            {this.getContactList(this.state.contacts, this.state.filter).map(
              item => (
                <ContactsListItem
                  data={item}
                  key={item.id}
                  onContactDeleteButtonClick={this.onContactDeleteButtonClick}
                />
              )
            )}
          </ContactsList>
        </Section>
      </>
    );
  }
}
