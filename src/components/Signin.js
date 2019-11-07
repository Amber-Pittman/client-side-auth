// #6 Create Signin Component
// #11 Import useState
import React, { useState } from "react"
import api from "../utils/api"

function Signin(props) {
	// #12 Set up some initial state
	const [error, setError] = useState()
	const [data, setData] = useState({ // remember this is an object and we don't have to construct a new object 
		email: "",
		password: "",
	})

	// #13 Create handleChange function for the inputs
	// Just a function that takes an event, then take the target name 
	//     and the target value and assign new state
	// Remember, input fields don't need preventDefault
	const handleChange = (event) => {
		// #14 set new state
		setData({
			// #15 Pass a new object
			...data, // #16 make object IMMUTABLE by spreading the data
			// #17 Pass in new value
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		// We are using are axios instance with predefined values,
		// rather than just plain old axios
		api()
			.post("/signin", data)
			.then(result => {
				// Store our new token in local storage so it persists
				localStorage.setItem("token", result.data.token)
				// Redirect the user to their account page after logging in
				props.history.push("/account")
			})
			.catch(err => {
				setError(err.response.data.message)
			})
	}
	
	return (
		// #9 Return a form tag
		<form onSubmit={handleSubmit}>
			{error && <div className="error">{error}</div>}

			{/* #10 Create some input fields and a button for the form */}
			<input 
				type="email" 
				autoComplete="email" 
				name="email" 
				placeholder="Email" 
				// #18A Attach these values and the handleChange function to 
				//    each one of our inputs
				value={data.email} 
				onChange={handleChange} />
			<input 
				type="password" 
				autoComplete="current-password" 
				name="password" 
				placeholder="Password" 
				// #18B Attach these values and the handleChange function to 
				//    each one of our inputs
				value={data.password} 
				onChange={handleChange} />

			<button type="submit">Sign In</button>
		</form>
	)
}

export default Signin