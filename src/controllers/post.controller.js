import * as postModel from "../models/posts.model.js";

export const getAllPosts = async (req, res) => {
  console.log("coming to posts get all posts controller");
  try {
    const result = await postModel.getAllPosts();
    console.log("all posts", result);
    res.status(200).send(result);
  } catch (err) {
    res.status(401).send({
      message: "Error while fetching all posts",
      error: err.message || err,
    });
  }
};

export const getPostById = async (req, res) => {
  console.log("coming to posts get  post by id controller");
  const { id } = req.params;
  try {
    const result = await postModel.getPostById(id);
    res.status(200).send(result);
  } catch (err) {
    res.status(401).send({
      message: "Error while fetching a post",
      error: err.message || err,
    });
  }
};

export const savePost = async (req, res) => {
  console.log("coming to posts save post controller", req.body);

  const { userName, title, body } = req.body;

  console.log("coming from frontend", title, userName, body);

  try {
    await postModel.savePost(title, userName, body);
    res.status(201).send({ message: "Post saved successfully" });
  } catch (err) {
    res
      .status(401)
      .send({ message: "Error while saving  post", error: err.message || err });
  }
};

export const editPost = async (req, res) => {
  console.log("coming to posts edit posts controller");
  const { id } = req.params;
  const { title, body, modifiedOn } = req.body;

  try {
    await postModel.editPost(id, title, body, modifiedOn);
    res.status(201).send({ message: "Post modified successfully" });
  } catch (err) {
    res.status(401).send({
      message: "Error while modifying post",
      error: err.message || err,
    });
  }
};

export const deletePost = async (req, res) => {
  console.log("coming to posts delete posts controller");
  const id = req.params.id;
  try {
    await postModel.deletePost(id);
    res.status(201).send({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(401).send({
      message: "Error while deleting post",
      error: err.message || err,
    });
  }
};

export const deleteAllPosts = async (req, res) => {
  console.log("coming to posts delete all posts controller");

  try {
    await postModel.deleteAllPosts();
    res.status(200).send({ message: "All posts deleted successfully" });
  } catch (err) {
    res.status(401).send({
      message: "Error while deleting all posts",
      error: err.message || err,
    });
  }
};
