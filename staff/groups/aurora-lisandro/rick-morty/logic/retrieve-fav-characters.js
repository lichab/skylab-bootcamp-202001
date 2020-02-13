function retrieveFavCharacters(token, callback) { 
    if (typeof token !== 'string') throw new Error(`token ${token} is not a string`)
    if (typeof callback !== 'function') throw new Error(`callback ${callback} is not a function`)

    call('https://skylabcoders.herokuapp.com/api/v2/users/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    }, (error, response) => {

        if (error) return callback(error)

        const user = JSON.parse(response.content)
        const { error: _error } = user

        if (_error) return callback(new Error(_error))

        const { favCharacters } = user

        if (!favCharacters || !favCharacters.length) return callback(undefined, [])


        call(`https://rickandmortyapi.com/api/character/${favCharacters}`, undefined, (error, response) => {
            if (error) return callback(error)

            if (response.content) {
                let results = JSON.parse(response.content)
                const { error } = results

                if (error) return callback(new Error(error))
                
                if(!(results instanceof Array)) {
                    results = [results]   
                }

                results.map(character => character.isFav = true)

                callback(undefined, results)

            }
        })

    })
}