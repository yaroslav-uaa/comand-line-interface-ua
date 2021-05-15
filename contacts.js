const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;

    const contacts = JSON.parse(data);
    const contact = contacts.find(
      (item) => String(item.id) === String(contactId)
    );
    if (!contact) console.log("Contact not found!");
    console.table(contact);
  });
}

function writeNewArr(path, newArr) {
  const contacts = JSON.stringify(newArr);
  fs.writeFile(path, contacts, (error) => {
    if (error) {
      console.log(error);
      return;
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;
    const contacts = JSON.parse(data);
    const refreshContacts = contacts.filter(
      (item) => String(item.id) !== String(contactId)
    );
    if (refreshContacts.length !== contacts.length) {
      writeNewArr(contactsPath, refreshContacts);
      console.log("Contact removed.");
    } else {
      console.log("Contact not found.");
      return;
    }
    console.table(refreshContacts);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;
    const contacts = JSON.parse(data);
    const newContact = { id: uuidv4(), name, email, phone };
    const newContacts = [...contacts, newContact];
    writeNewArr(contactsPath, newContacts);
    console.table(newContacts);
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
