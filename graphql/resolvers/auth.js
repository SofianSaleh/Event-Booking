const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isAuth = require("../../middleware/is-auth");

const User = require("../../models/user");

const tokenRelated = user => {
  const token = jwt.sign(
    { userId: user.id, email: user._doc.email, username: user._doc.username },
    process.env.JWT_SECRET,
    { expiresIn: "15s" }
  );
  return token;
};

module.exports = {
  createUser: async args => {
    try {
      const oneUser = await User.findOne({ email: args.userInput.email });
      if (!!oneUser) {
        throw new Error(` User with the username: ${args.userInput.username} already exists
            `);
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        username: args.userInput.username,
        email: args.userInput.email,
        password: hashedPassword
      });

      await user.save();

      user.password = null;
      const token = tokenRelated(user);
      return {
        userId: user._id,
        username: user.username,
        email: user.email,
        token,
        tokenExpiration: "15 sec"
      };
    } catch (e) {
      throw e.message;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error(`User doesn't exist`);
      }
      const isEqual = await bcrypt.compare(password, user._doc.password);
      if (!isEqual) {
        throw new Error(`Password is incorrect`);
      }
      const token = tokenRelated(user);
      return {
        userId: user.id,
        username: user._doc.username,
        email: user.email,
        token,
        tokenExpiration: "15 sec"
      };
    } catch (err) {
      throw err;
    }
  }
};
