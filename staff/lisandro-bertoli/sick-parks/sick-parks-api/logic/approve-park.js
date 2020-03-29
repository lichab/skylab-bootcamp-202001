const { NotFoundError, NotAllowedError } = require('sick-parks-errors')
const { models: { Park, User } } = require('sick-parks-data')
const { validate } = require('sick-parks-utils')

/**
 * Adds user aproval to park, makes the park verified if requirements are met
 * 
 * @param {string} userId user's unique id
 * @param {object} req.params the parameters of the request
 * @param {string} req.params.id the park unique id
 * 
 * @returns {undefined}
 * 
 * @throws {ContentError} if params don't follow the format and content rules
 * @throws {TypeError} if user data and park does not have the correct type
 * @throws {NotFoundError} when the provided id's don't match any document on the DB
 */


module.exports = (userId, { id: parkId }) => {
    validate.string(userId, 'userId')
    validate.string(parkId, 'parkId')


    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

        const park = await Park.findById(parkId)

        if (!park) throw new NotFoundError(`park with id ${parkId} does not exist`)
        if (park.approvals.includes(user._id)) throw new NotAllowedError(`user with id ${userId} already approved`)


        park.approvals.push(user)
        user.contributions.push(park)

        if (park.approvals.length >= 5) {
            park.verified = true
            await park.save()
            return
        }
        await user.save()
        await park.save()
        return

    })()

}