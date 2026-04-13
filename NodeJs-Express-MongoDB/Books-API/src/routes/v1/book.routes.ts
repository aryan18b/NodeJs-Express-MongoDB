import express from "express";
import * as controller from "../../controllers/book.controller.js";
import { validateId, validateBody } from "../../middlewares/validation.js";
import { upload } from "../../middlewares/multer.js";

const router = express.Router();

// Router-level Middleware
router.use("/:id", validateId);

router.get("/", controller.getBooksAsync);

router.get("/:id", controller.getBookByIdAsync);

router.post("/",
  upload.single("coverImage"),
  validateBody,
  controller.addBookAsync,
);

router.delete("/:id", controller.deleteBookAsync);

router.put("/:id", validateBody, controller.updateBookAsync);

export default router;
