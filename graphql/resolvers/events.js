const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToStringHelper } = require("../../helpers/date");
const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (e) {
      throw e;
    }
  },
  createEvent: async (args, req) => {
    console.log(req.isAuth);
    if (!req.isAuth) {
      throw new Error(`UnAuthorized`);
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToStringHelper(args.eventInput.date),
      creator: req.user.userId
    });
    console.log(event);
    await event.save();
    const creatorOfTheEvent = await User.findById(req.user.userId);
    creatorOfTheEvent.createdEvents.push(event);
    await creatorOfTheEvent.save();
    return transformEvent(event);
  }
};
