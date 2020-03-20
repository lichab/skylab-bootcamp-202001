const context = require('./context')
const fetch = require('node-fetch')
const atob = require('atob')

module.exports = function retrieveUser() {

    return (async () => {
        const token = await this.storage.getItem('token')
        const [, payload] = token.split('.')
        const { sub } = atob(payload)

        const response = await fetch(`http://192.168.1.101:8085/api/users/${sub}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })

        const data = await response.json()
        const { error: _error } = data

        if (_error) throw new Error(_error)
        debugger
        const { name, surname, email, contributions, image, allowLocation, notifications } = data

        return { name, surname, email, contributions, image, allowLocation, notifications }

    })()
}.bind(context)