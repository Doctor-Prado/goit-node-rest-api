import express from "express";
import mongoose from "mongoose";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";

import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

const validateContactId = (req, res, next) => {
  const id = req.params.id ?? req.params.contactId;

  if (!mongoose.isObjectIdOrHexString(id)) {
    return res.status(400).json({
      message: "Invalid contact ID"
    });
  }

  next();
};

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", validateContactId, getOneContact);

contactsRouter.delete("/:id", validateContactId, deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  validateContactId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  validateContactId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;