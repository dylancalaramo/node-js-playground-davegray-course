//a custom controller specifically used to register new users to
//your users model
const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  //get username and password from request body

  const { user, pwd } = req.body;
  //if either one of them is missing
  //send a bad request (400) status to the client
  //and end the function
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  //check for duplicate user credentials in the db
  const duplicate = usersDB.users.find((person) => person.username === user);
  console.log(duplicate);
  //if there is a duplicate username
  //send back a code 409 (conflict code) as the response
  if (duplicate) return res.sendStatus(409);
  try {
    //encrypt the password using bcrypt
    //bcrypt.hash has two variables
    //first is the string you want to hash
    //second is the number of salt rounds to be used
    //by the encryption algorithm
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = { username: user, password: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.send(201).json({ success: `New user ${user} created` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handleNewUser,
};
