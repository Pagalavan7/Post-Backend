import sql from "mssql";

export class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export const save = async function (name, email, password) {
  try {
    console.log("Entering user model");
    const request = new sql.Request();
    const result = await request
      .input("name", name)
      .input("email", email)
      .input("password", password)
      .query("insert into Users values(@name,@email,@password)");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const findByEmail = async function (email) {
  try {
    console.log("Entering into findbyemail");
    const request = new sql.Request();
    const result = await request
      .input("email", email)
      .query("select * from Users where email = @email");
    console.log("result of findbyemail", result);
    return result.recordset[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};
