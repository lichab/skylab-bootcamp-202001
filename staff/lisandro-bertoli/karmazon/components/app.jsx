const IT = '🎈🤡'

const { Component } = React

class App extends Component {

    state = {
        view: undefined,
        vehicles: undefined,
        vehicle: undefined,
        error: undefined,
        token: undefined,
        user: undefined,
        favorites: undefined
    }

    __handleErrors__ = error => {
        this.setState({ error: error.message })

        setTimeout(() => {
            this.setState({ error: undefined })
        }, 3000)
    }

    componentWillMount() {
        const { token } = sessionStorage

        if (token)
            retrieveUser(token, (error, user) => {
                if (error)
                    return this.setState({ error: error.message + ' ' + IT })

                if (location.search) {
                    const query = location.search.split('=')[1]

                    searchVehicles(token, query, (error, vehicles) => {
                        if (error)
                            this.setState({ error: error.message + ' ' + IT })

                        this.setState({ view: 'search', user, query, vehicles, error: !vehicles.length ? undefined : 'No results ' + IT })

                        if (!vehicles.length)
                            setTimeout(() => {
                                this.setState({ error: undefined })
                            }, 3000)
                    })
                } else
                    this.setState({ view: 'search', user })
            })
        else this.setState({ view: 'login' })
    }


    handleLogin = (username, password) => {
        try {
            authenticateUser(username, password, (error, token) => {
                if (error) {
                    this.__handleErrors__(error)
                } else {

                    retrieveUser(token, (error, user) => {
                        if (error) {
                            this.__handleErrors__(error)
                        } else {
                            sessionStorage.token = token
                            this.setState({ view: 'search', user })
                        }
                    })
                }
            })

        } catch (error) {
            this.__handleErrors__(error)
        }
    }


    handleToRegister = () => this.setState({ view: 'register' })

    handleRegister = (name, surname, username, password) => {
        try {
            registerUser(name, surname, username, password, (error) => {
                if (error) {
                    this.__handleErrors__(error)

                } else {
                    this.setState({ view: 'login' })
                }
            })
            this.setState({ view: 'login' })

        } catch (error) {
            this.__handleErrors__(error)

        }
    }

    handleToLogin = () => this.setState({ view: 'login' })

    handleSearch = query => {
        const token = sessionStorage.token

        searchVehicles(token, query, (error, vehicles) => {
            if (error) return this.__handleErrors__(error)

            setUrl(query)

            this.setState({ vehicles, vehicle: undefined })

            if (!vehicles.length) {
                this.setState({ error: 'No results' })

                setTimeout(() => {
                    this.setState({ error: undefined })
                }, 3000)
            }


        })
    }

    handleDetail = id => {
        const token = sessionStorage.token
        retrieveVehicle(token, id, (error, vehicle) => {
            if (error) return this.__handleErrors__(error)

            this.setState({ vehicle, view: 'search' })
        })
    }

    handleLogout = () => {
        sessionStorage.clear();
        setUrl()

        this.setState({ user: undefined, vehicles: undefined, view: 'login' })
    }

    handleHeartClick = id => {

        const token = sessionStorage.token
        toggleFavVehicle(id, token, error => {

            if (error) {
                this.__handleErrors__(error)

            } else if (!this.state.vehicle && !this.state.favorites) {
                const query = location.search.split('=')[1]
                searchVehicles(token, query, (error, vehicles) => {
                    if (error) return this.__handleErrors__(error)

                    setUrl(query)

                    this.setState({
                        vehicles: !this.state.vehicle ? vehicles : undefined,
                        vehicle: !this.state.vechicles ? this.state.vehicle : undefined
                    })

                    if (!vehicles.length) {
                        this.setState({ error: 'No results' })
                        setTimeout(() => {
                            this.setState({ error: undefined })
                        }, 3000)
                    }

                })
            } else if (this.state.vehicle) {
                retrieveVehicle(token, id, (error, vehicle) => {
                    if (error) return this.__handleErrors__(error)
                    this.setState({
                        vehicle,
                        vehicles: undefined,
                        favorites: undefined
                    })
                })
            } else if (this.state.favorites) {

                const token = sessionStorage.token
                retrieveFavorites(token, (error, favsList) => {
                    if (error) return this.__handleErrors__(error)

                    this.setState({
                        view: 'favorites',
                        vechicles: undefined,
                        vehicle: undefined,
                        favorites: favsList
                    })
                })
            }
        })
    }

    handleOnToFavs = () => {
        const token = sessionStorage.token
        retrieveFavorites(token, (error, favsList) => {
            if (error) return this.__handleErrors__(error)

            this.setState({
                view: 'favorites',
                vechicles: undefined,
                vehicle: undefined,
                favorites: favsList
            })
        })
    }

    handleBackToSearch = () => {
        const query = location.search.split('=')[1]
        this.handleSearch(query)//TODO going back to search leaves sign of No Results!!
    }

    render() {
        const {
            props: { title },
            state: { view, vehicle, vehicles, error, favorites }, handleDetail, handleLogin, handleRegister, handleSearch, handleToLogin, handleToRegister, handleHeartClick, handleLogout, handleOnToFavs, handleBackToSearch } = this

        return <main>
            <h1>{title}</h1>
            <a href="#" onClick={handleOnToFavs}>Favs</a>

            {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleToRegister} error={error} />}

            {view === 'register' && <Register onSubmit={handleRegister} onToLogin={handleToLogin} error={error} />}

            {view === 'search' && <Search title="Search" error={error} onSubmit={handleSearch} onLogout={handleLogout} />}

            {view === 'search' && vehicles && !vehicle && <Results results={vehicles} onItemClick={handleDetail} onHeartClick={handleHeartClick} />}

            {view === 'search' && vehicle && <Detail vehicle={vehicle} onBack={handleBackToSearch} onFavClick={handleHeartClick} />}

            {view === 'favorites' && <Favorites favs={favorites} onItemClick={handleDetail} onHeartClick={handleHeartClick} onToSearch={handleBackToSearch} />}

        </main>
    }
}
