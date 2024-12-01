const express = require("express");
const User = require("../models/User");
const router = express.Router();

// router.post("/save", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const newUser = new User({
//       email,
//       password,
//     });
//     await newUser.save();
//     res.status(201).json({ message: "User data saved successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error, please try again" });
//   }
// });

router.post("/save", async (req, res) => {
  const { email, password } = req.body;

  // Check for missing fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const newUser = new User({
      email,
      password,
    });

    // Save the data in the database
    await newUser.save();
    res.status(201).json({ message: "User data saved successfully" });
  } catch (error) {
    console.error(error);

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Server error, please try again" });
  }
});

module.exports = router;
