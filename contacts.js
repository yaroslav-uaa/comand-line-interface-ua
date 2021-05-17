const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find(
      (item) => String(item.id) === String(contactId)
    );
    if (!contact) console.log("Contact not found!");
    console.table(contact);
  } catch (error) {
    console.log(error);
  }
};

const writeNewArr = async (path, newArr) => {
  const contacts = JSON.stringify(newArr);
  try {
    await fs.writeFile(path, contacts);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
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
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { id: uuidv4(), name, email, phone };
    const newContacts = [...contacts, newContact];
    writeNewArr(contactsPath, newContacts);
    console.table(newContacts);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
