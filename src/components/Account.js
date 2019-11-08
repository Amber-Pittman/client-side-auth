// #34 Create an Account for the user


// #35 Import React
// #38 Import useState
// #40 Import useEffect
import React, { useState, useEffect } from "react"

// #42 Import api helper
import api from "../utils/api"

// #36 Start your new function and export it
function Account(props) {
	// #39 Create initial State with useState
	const [user, setUser] = useState({
		name: "",
		email: "",
	})

	// #41 Create a side effect with useEffect
	useEffect(() => {
		// #43 Make that axios call using api
		api().get("/me")
			.then(result => {
				// #44 set user to an object
				setUser({
					// while we could have done result.data, we want to be specific 
					  // due to unknown keys
					name: result.data.name,
					email: result.data.email,
				})
			})
			.catch(error => {
				console.log(error)
			})
	}, []) // empty dependency array b/c we only want it to run when the 
			 // page initially loads

	// #37 Build out the Account Page for Display
	return (
		<>
			<h1>My Account</h1>

			<div className="account-row">Name: {user.name}</div>
			<div className="account-row">Email: {user.email}</div>
		</>
	)
}

export default Account