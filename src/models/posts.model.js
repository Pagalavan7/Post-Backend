import sql from "mssql";

export const getAllPosts = async () => {
  try {
    const request = new sql.Request();
    const result = await request.query(`select * from posts order by id desc`);
    return result.recordset;
  } catch (err) {
    console.log(err.message || err);
    throw err.message || err;
  }
};

export const savePost = async (title, username, body, createdOn) => {
  try {
    const request = new sql.Request();
    await request
      .input("title", title)
      .input("body", body)
      .input("username", username)
      .input("createdOn", createdOn)
      .query(`insert into posts values(@title,@body,@username,@createdOn)`);
  } catch (err) {
    console.log(err.message || err);
    throw err.message || err;
  }
};

export const editPost = async (id, title, content) => {
  try {
    console.log("model of edit post ");
    const request = new sql.Request();
    const result = await request
      .input("id", id)
      .input("title", title)
      .input("body", content)
      .query("update posts set title = @title, [body] = @body where id=@id");
    const status = result.rowsAffected[0] ? true : false;
    if (!status)
      throw new Error("No post with such id found. Cannot update post!");
  } catch (err) {
    console.log(err);
    throw err.message || err;
  }
};

export const deletePost = async (id) => {
  try {
    const request = new sql.Request();
    const result = await request
      .input("id", id)
      .query("delete from Posts where id = @id");
    console.log(result);
  } catch (err) {
    console.log(err.message || err);
    throw err.message || err;
  }
};

export const deleteAllPosts = async () => {
  try {
    const request = new sql.Request();
    const result = await request.query("truncate table Posts");
    console.log(result);
  } catch (err) {
    console.log(err.message || err);
    throw err.message || err;
  }
};
