const fsPromises = require("fs").promises;
const path = require("path");
const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

//to logout the user you must delete the cookie stored in
//their browser as well as the refresh token stored
//with their associated account in users model
const handleLogout = async (req, res) => {
  //get cookies from client
  const cookies = req.cookies;

  //if cookie is missing or there's no jwt,
  //we can't delete anything
  if (!cookies?.jwt) return res.sendStatus(204);
  //request successful but no content to send back

  const refreshToken = cookies.jwt;

  //check if the refresh token belongs to a user in the db
  const existUser = usersDB.users.find(
    (user) => user.refreshToken === refreshToken
  );

  //cookie can be cleared now as we already have the jwt
  res.clearCookie("jwt", {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  //if the jwt token has no matches, no need to find and delete
  //the jwt in the db
  if (!existUser) return res.sendStatus(204);
  //request successful but no content to send back

  //get all users the remaining users that arent the target user
  const otherUsers = usersDB.users.filter(
    (user) => user.refreshToken === existUser.refreshToken
  );
  const currentUser = { ...existUser, refreshToken: "" };
  //concatenate all the other users with the modified data
  //of target user
  usersDB.setUsers([...otherUsers, currentUser]);

  //write the user data to db
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );

  res.sendStatus(204); //request successful but no content to send back
};

module.exports = { handleLogout };
