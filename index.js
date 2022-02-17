const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts_");

const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = listContacts();
      break;

    case "get":
      const contact = getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      break;

    case "add":
      const newContact = addContact(name, email, phone);
      break;

    case "remove":
      const removedContact = removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

(async () => {
  invokeAction(argv);
})();
