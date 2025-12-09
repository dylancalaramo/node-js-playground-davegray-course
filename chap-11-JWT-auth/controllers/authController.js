const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");

//import the jwt node package to use jwt related functions
const jwt = require("jsonwebtoken");
//loads the contents of your .env file into the current JS process
require("dotenv").config();

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "username and password required" });
  //check if user actually exists before trying to login
  const existUser = usersDB.users.find((user) => user.username === username);
  if (!existUser)
    return res
      .status(400)
      .json({ message: "username or password is wrong or does not exist" });
  const match = await bcrypt.compare(password, existUser.password);
  if (match) {
    //create an access token from the username of the authenticated user
    //first function is the payload
    //in other words, the string/object that will be used
    //together with encryption to create the access token

    //do not use any sensitive information such as
    //passwords to create the access token
    //as the payload can be made visible by other parties

    //it is important to store your secret tokens
    //somewhere safe as third parties can decrypt all your
    //tokens or create new tokens of their own
    //if they know the token secrets

    //in this example, we will use the user's username
    //the time until the expiration of the access token
    //and the app's access token secret to create the access token
    const accessToken = jwt.sign(
      { username: existUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    //use the refresh token to validate the user
    //in api requests
    //if the user has no/expired access token
    //the app should check if they have a valid refresh token
    //and issue them a new access token if they have the former

    //in this example, we will use the user's username
    //the time until the expiration of the access token
    //and the app's access token secret to create the access token
    const refreshToken = jwt.sign(
      { username: existUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //if the user has no/expired refresh token, they are required
    //to log back in to create a new one
    //as long as the refresh token is valid,
    //the user is automatically authenticated

    //once the JWT tokens are created
    //store the access token in the database
    //allows you to cross reference the access token of the user
    //to see if their access token is valid
    const otherUsers = usersDB.users.filter(
      (user) => user.username !== existUser.username
    );
    const currentUser = { ...existUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    //normally, these tokens should be sent back to the user
    //and store them ideally in memory, and not in browser
    //cookies or in browser storage
    //but for the sake of the example
    //we will send the refresh token as a cookie but
    //as an html file

    //send the refresh token as a cookie html file
    //sending it as an html file prevents javascript from
    //reading the cookie as it is in a different format
    //making it more secure
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //send as html
      maxAge: 24 * 60 * 60 * 1000, //equivalent to one day
    });
    //send the access token as json
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: "username or password is invalid" });
  }
};

module.exports = {
  handleLogin,
};
