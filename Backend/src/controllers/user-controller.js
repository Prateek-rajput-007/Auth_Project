const User = require("../model/user");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Return here
    }

    return res.status(200).json({ message: "User fetched", user }); // Return to prevent further execution
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" }); // Return again
  }
};
