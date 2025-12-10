import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

/**
 * A function that logs out the current user and redirects them to the login page.
 * It makes a GET request to /users/logout and if the response status is 200, it removes the token from local storage and navigates to the login page.
 * @returns A JSX element that displays "UserLogout".
 */
export const UserLogout = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token')
            navigate('/login')
        }
    })

    return (
        <div>UserLogout</div>
    )
}

export default UserLogout