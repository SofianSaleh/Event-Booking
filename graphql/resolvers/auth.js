const bcrypt = require("bcryptjs");

const User = require("../../models/user");


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
            return user;
        } catch (e) {
            throw e.message;
        }
    },
}
