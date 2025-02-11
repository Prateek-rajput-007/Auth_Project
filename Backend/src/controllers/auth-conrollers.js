const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // CHECKING IF THE USER ALREADY EXISTS
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (error) {
      console.log(error.message);
    }

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // HASHING THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATING A NEW USER
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).json({ message: user });
  } catch (error) {
    console.log(error.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // CHECKING IF THE USER ALREADY EXISTS
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error.message);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User does not exist" });
  }

  // CHECKING IF THE PASSWORD IS CORRECT
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // CREATING A TOKEN
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30s",
  });
  console.log("Generated Token: ", token); // Log token for debugging

  res.cookie("token", token, { // Set the token with the name `token`
    path: "/",
    expires: new Date(Date.now() + 1000 * 30), // Corrected property name to `expires`
    httpOnly: true,
    sameSite: "lax",
  });
  return res.status(200).json({ message: "Successfully logged in" }); // Return to prevent further execution
};

