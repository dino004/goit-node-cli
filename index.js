import { program } from "commander";
import * as contactFunctions from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactFunctions.listContacts();
      return console.log(allContacts);
    case "get":
      const oneContactById = await contactFunctions.getContactById(id);
      return console.log(oneContactById);
    case "add":
      const newContact = await contactFunctions.addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const deleteContact = await contactFunctions.removeContact(id);
      return console.log(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
