import Contact from "../models/contact.js";

export async function listContacts() {
    const contacts = await Contact.find();
    return contacts;
}

export async function getContactById(contactId) {
    const contact = await Contact.findById(contactId)
    return contact;
}

export async function removeContact(contactId) {
    const contactToRemove = await Contact.findByIdAndDelete(contactId);
    return contactToRemove
}

export async function addContact(name, email, phone) {
    const contactCreate = await Contact.create({
        name,
        email,
        phone
    });
    return contactCreate
}

export async function updateContact(contactId, updates) {
    return await Contact.findByIdAndUpdate(contactId, updates, {
        returnDocument: "after",
        runValidators: true
    })
}

export async function updateStatusContact(contactId, body) {
    return await Contact.findByIdAndUpdate(contactId, body, {
        returnDocument: "after",
        runValidators: true
    })
}