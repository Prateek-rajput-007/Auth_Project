const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  console.log("Cookies: ", cookies); // Log cookies for debugging
  if (!cookies) {
    return res.status(404).json({ message: "No token found" });
  }

  // Parse cookies to extract the token
  const token = cookies.split(";").find(cookie => cookie.trim().startsWith("token="))?.split("=")[1];
  console.log("Token: ", token); // Log token for debugging
  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      console.log("Token verification error: ", error); // Log error for debugging
      return res.status(400).json({ message: "Invalid token" });
    }
    req.user = user; // Assign user to req.user
    next(); // Move `next()` inside `jwt.verify()` to ensure it is only called when verification succeeds
  });
};

module.exports = verifyToken;
