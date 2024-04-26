import User from "./userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const Signup = async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    res.status(400).json({
      success: false,
      message: "User already exist",
    });
  } else {
    if (firstName && lastName && email && password && phoneNumber) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
          firstName: firstName,
          email: email,
          password: hashPassword,
          lastName: lastName,
          phoneNumber: phoneNumber,
        });
        await newUser.save();

        const saveUser = await User.findOne({ email: email });
        const token = jwt.sign(
          { userId: saveUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );

        res.status(200).json({
          success: true,
          message: "Signup successful",
          userID: saveUser._id,
          firstName: saveUser.firstName,
          lastName: saveUser.lastName,
          email: saveUser.email,
          phoneNumber: saveUser.phoneNumber,
          token: token,
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({
          success: false,
          mesaage: "Something wents wrong",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Please fill empty fields",
      });
    }
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email == email && isMatch) {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
          });

          res.status(200).json({
            success: true,
            message: "Sign in successful",
            userId: user._id,
            email: user.email,
            token: token,
            role: user.role,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Wrong Username/Password.",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "User is not registered",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Please fill empty fields",
      });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { Signup, Login };
