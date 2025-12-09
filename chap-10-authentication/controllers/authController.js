const usersDB = {
  users: require("../model/users.json"),
};
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "username and password required" });
  const existUser = usersDB.users.find((user) => user.username === username);
  if (!existUser)
    return res
      .status(400)
      .json({ message: "username or password does not exist" });

  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    res.json({ success: `${username} is logged in` });
  } else {
    res.status(401).json({ message: "username or password does not exist" });
  }
};

module.exports = {
  handleLogin,
};
