const Event = require("../../models/event");
const { dateToStringHelper } = require('../../helpers/date')


const transformEvent = event => {
    return {
        ...event._doc,
        date: dateToStringHelper(event._doc.date),
        creator: getUser.bind(this, event._doc.creator)
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
}
