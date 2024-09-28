import * as postModel from "../models/posts.model.js";

export const getAllPosts = async (req, res) => {
  try {
    const result = await postModel.getAllPosts();
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message || err);
    res.status(401).send({
      message: "Error while fetching all posts",
      error: err.message || err,
    });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await postModel.getPostById(id);
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message || err);
    res.status(401).send({
      message: "Error while fetching a post",
      error: err.message || err,
    });
  }
};

export const savePost = async (req, res) => {
  const { title, userName, body, createdOn } = req.body;

  try {
    await postModel.savePost(title, userName, body, createdOn);
    res.status(201).send({ message: "Post saved successfully" });
  } catch (err) {
    console.log(err.message || err);
    res
      .status(401)
      .send({ message: "Error while saving  post", error: err.message || err });
  }
};

export const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    await postModel.editPost(id, title, body);
    res.status(201).send({ message: "Post modified successfully" });
  } catch (err) {
    console.log(err.message || err);
    res.status(401).send({
      message: "Error while modifying post",
      error: err.message || err,
    });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    await postModel.deletePost(id);
    res.status(201).send({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err.message || err);
    res.status(401).send({
      message: "Error while deleting post",
      error: err.message || err,
    });
  }
};

export const deleteAllPosts = async (req, res) => {
  try {
    await postModel.deleteAllPosts();
    res.status(200).send({ message: "All posts deleted successfully" });
  } catch (err) {
    console.log(err.message || err);
    res.status(401).send({
      message: "Error while deleting all posts",
      error: err.message || err,
    });
  }
};
