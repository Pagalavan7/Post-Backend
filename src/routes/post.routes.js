import { Router } from "express";

import * as postController from "../controllers/post.controller.js";

const router = Router();

router.get("/get-all-posts", postController.getAllPosts);
router.post("/save-post", postController.savePost);
router.patch("/edit-post/:id", postController.editPost);
router.delete("/delete-post/:id", postController.deletePost);
router.delete("/delete-all-posts", postController.deleteAllPosts);

export default router;
