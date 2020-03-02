require('dotenv').config()

const mongoose = require('mongoose')
const { env: { TEST_MONGODB_URL } } = process
const { models: { User } } = require('../data')
const { expect } = require('chai')
const { random } = Math
const authenticateUser = require('./authenticate-user')

describe('authenticateUser', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    )

    let name, surname, email, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            User.create(new User({ name, surname, email, password }))
                .then(({ id }) => _id = id)
        )

        it('should succeed on correct and valid and right credentials', () =>
            authenticateUser(email, password)
                .then(id => {
                    expect(id).to.be.a('string')
                    expect(id.length).to.be.greaterThan(0)
                    expect(id).to.equal(_id)
                })
        )
    })

    after(() => mongoose.disconnect())
})