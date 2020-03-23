const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/booking");
const { dateToStringHelper } = require('../../helpers/date')


const transformBooking = booking => {
    return {
        ...booking._doc,
        user: getUser.bind(this, booking._doc.user),
        event: getSingleEvent.bind(this, booking._doc.event),
        createdAt: dateToStringHelper(booking._doc.createdAt),
        updatedAt: dateToStringHelper(booking._doc.updatedAt)
    }
}



module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return transformEvent(event)
            });
        } catch (e) {
            throw e;
        }
    },
    bookings: async () => {
        try {
            const bookings = await Booking.find()
            return bookings.map(booking => {
                return transformBooking(booking)

            })
        } catch (err) {
            throw err
        }
    },
    createEvent: async args => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: dateToStringHelper(args.eventInput.date),
            creator: "5e77c5a5af297c06d4685bca"
        });
        await event.save();
        const creatorOfTheEvent = await User.findById("5e77c5a5af297c06d4685bca");
        creatorOfTheEvent.createdEvents.push(event);
        await creatorOfTheEvent.save();
        return transformEvent(event);
    },
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
    bookEvent: async args => {
        try {
            const fetchedEvent = await Event.findById(args.eventId)
            const booking = new Booking({
                user: "5e77c5a5af297c06d4685bca",
                event: fetchedEvent
            })
            const result = await booking.save()
            return transformBooking(result)

        } catch (err) {
            throw err
        }
    },
    cancelBooking: async args => {
        try {
            const deletedEvent = await Booking.findByIdAndDelete({ _id: args.bookingId })
            return transformBooking(deletedEvent)


        } catch (err) {
            throw err
        }
    }
}
