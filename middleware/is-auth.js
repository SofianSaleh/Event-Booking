const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(`hi`);
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      req.isAuth = false;
      return next();
    }
    req.isAuth = true;
    req.user = {
      userId: decodedToken.userId,
      username: decodedToken.username
    };
    next();
  } catch (err) {
    req.isAuth = false;
    return next();
  }
};
