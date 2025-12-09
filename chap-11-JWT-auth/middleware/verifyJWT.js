const jwt = require("jsonwebtoken");
require("dotenv").config();
//import the jwt node package to use jwt related functions

//middleware that automatically handles access token jwt verification
//for every http requests that require authorization
//includes api calls, database fetching, posting, etc.

const verifyJWT = (req, res, next) => {
  //get the request header's authorization information
  const authHeader = req.headers["authorization"];
  //return status 401 (unathorized request)
  if (!authHeader) return res.sendStatus(401);

  //JWT auth headers have a "bearer token" key that
  //contains the JWT data
  //ex: "Bearer-Token": "qwcoiwefhwui9egr13296476319"
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token, //the token being verified
    process.env.ACCESS_TOKEN_SECRET, //the key used to
    //(either public or private key) create the token
    (err, decoded) => {
      //if the token is invalid, the err parameter gets information
      if (err) return res.sendStatus(403); //invalid token
      //set the user parameter of the request using the username
      //from the decoded token
      req.user = decoded.username;
      //we will use this username to cross check our model
      //if their refresh token tied to the username is valid
      next();
    }
  );
};

module.exports = { verifyJWT };
