import React from 'react'
import Feedback from '../components/Feedback'


const Register = ({ onSubmit, error }) => {

    const handleOnSubmit = (event) => {
        event.preventDefault()
        const { name, surname, email, password } = event.target

        onSubmit(name.value, surname.value, email.value, password.value)
    }

    return <form className="register" onSubmit={handleOnSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="surname" placeholder="Surname" />
        <input type="text" name="email" placeholder="email@example.com" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Register</button>
        {error && <Feedback message={error} />}
    </form>
}

export default Register