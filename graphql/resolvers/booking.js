const Event = require("../../models/event");
const Booking = require("../../models/booking");
const { getUser, getSingleEvent } = require("./merge")
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
    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error(`UnAuthorized`)
        }
        try {
            const bookings = await Booking.find()
            return bookings.map(booking => {
                return transformBooking(booking)

            })
        } catch (err) {
            throw err
        }
    },
    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error(`UnAuthorized`)
        }
        try {
            const fetchedEvent = await Event.findById(args.eventId)
            const booking = new Booking({
                user: req.user.userId,
                event: fetchedEvent
            })
            const result = await booking.save()
            return transformBooking(result)

        } catch (err) {
            throw err
        }
    },
    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error(`UnAuthorized`)
        }
        try {
            const deletedEvent = await Booking.findByIdAndDelete({ _id: args.bookingId })
            return transformBooking(deletedEvent)


        } catch (err) {
            throw err
        }
    }
}
