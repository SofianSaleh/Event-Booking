const Event = require("../../models/event");
const Booking = require("../../models/booking");
const User = require("../../models/user");
const { dateToStringHelper } = require('../../helpers/date')


const transformEvent = event => {
    return {
        ...event._doc,
        date: dateToStringHelper(event._doc.date),
        creator: getUser.bind(this, event._doc.creator)
    }
}

const event = async eventIds => {
    try {
        let events = await Event.find({ _id: { $in: eventIds } })
        return events.map(event => {
            return transformEvent(event)
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

module.exports.event = event
module.exports.getUser = getUser
module.exports.getSingleEvent = getSingleEvent
module.exports.transformEvent = transformEvent