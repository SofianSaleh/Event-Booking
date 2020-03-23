const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/booking");


const event = async eventIds => {
    try {
        let events = await Event.find({ _id: { $in: eventIds } })
        return events.map(event => {
            return {
                ...event._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: getUser.bind(this, event._doc.creator)
            }
        })

    } catch (err) {
        throw err
    }
}

const getUser = async userId => {
    try {
        let creator = await User.findById(userId)
        console.log(creator)
        return {
            ...creator._doc,
            createdEvents: event.bind(this, creator._doc.createdEvents)
        }
    } catch (err) {
        throw err
    }
}

const getSingleEvent = async eventId => {
    try {
        const singleEvent = await Event.findById(eventId)
        console.log(singleEvent)
        return {
            ...singleEvent._doc,
            creator: getUser.bind(this, singleEvent._doc.creator)
        }
    } catch (err) {
        throw err
    }
}

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return {
                    ...event._doc,
                    date: new Date(event._doc.date).toISOString(),
                    creator: getUser.bind(this, event._doc.creator)
                };
            });
        } catch (e) {
            throw e;
        }
    },
    bookings: async () => {
        try {
            const bookings = await Booking.find()
            return bookings.map(booking => {
                return {
                    ...booking._doc,
                    user: getUser.bind(this, booking._doc.user),
                    event: getSingleEvent.bind(this, booking._doc.event),
                    createdAt: new Date(booking._doc.createdAt).toISOString(),
                    updatedAt: new Date(booking._doc.updatedAt).toISOString()
                }

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
            date: new Date(args.eventInput.date),
            creator: "5e77c5a5af297c06d4685bca"
        });
        await event.save();
        const creatorOfTheEvent = await User.findById("5e77c5a5af297c06d4685bca");
        creatorOfTheEvent.createdEvents.push(event);
        await creatorOfTheEvent.save();
        return {
            ...event._doc,
            date: new Date(event._doc.date).toISOString(),
            creator: getUser.bind(this, event._doc.creator)
        };
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
            return {
                ...result._doc,
                user: getUser.bind(this, result._doc.user),
                event: getSingleEvent.bind(this, result._doc.event),
                createdAt: new Date(result._doc.createdAt).toISOString(),
                updatedAt: new Date(result._doc.updatedAt).toISOString()
            }
        } catch (err) {
            throw err
        }
    },
    cancelBooking: async args => {
        try {
            const deletedEvent = await Booking.findByIdAndDelete({ _id: args.bookingId })
            return {
                ...deletedEvent._doc,
                event: getSingleEvent.bind(this, deletedEvent._doc.event),
                user: getUser.bind(this, deletedEvent._doc.user),
                createdAt: new Date(deletedEvent._doc.createdAt).toISOString(),
                updatedAt: new Date(deletedEvent._doc.updatedAt).toISOString()
            }

        } catch (err) {
            throw err
        }
    }
}
