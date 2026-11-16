import { listContacts, getContactById, removeContact, addContact, updateContact as updateContactService } from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
    const contactsList = await listContacts();
    return res.status(200).json(contactsList)
};

export const getOneContact = async (req, res) => {
    const id = req.params.id;
    const oneContact = await getContactById(id);
    return oneContact ? res.status(200).json(oneContact) : res.status(404).json({
        message: "Not found"
    })
};

export const deleteContact = async (req, res) => {
    const id = req.params.id;
    const deletedContact = await removeContact(id);
    return deletedContact ? res.status(200).json(deletedContact) : res.status(404).json({
        message: "Not found"
    })
};

export const createContact = async (req, res) => {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    return res.status(201).json(newContact)
};

export const updateContact = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            "message": "Body must have at least one field"
        })
    }
    const id = req.params.id;
    const updates = req.body;
    const updatedContact = await updateContactService(id, updates);

    if (updatedContact === null) {
        return res.status(404).json({
            "message": "Not found"
        })
    }
    res.status(200).json(updatedContact);
};
