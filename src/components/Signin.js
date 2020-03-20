// #11 Import useState
import React, { useState } from "react"

// #32 Instead of importing axios, we'll import api, axios can be removed
import api from "../utils/api";
// // #24 Import axios
// import axios from "axios";

// #6 Create Signin Component
function Signin(props) {
	// #20 Set up error state for error component/message
	//    It does not need preventDefault either
	const [error, setError] = useState()
	// #12 Set up some initial state
	const [data, setData] = useState({ 
		// remember this is an object and we don't have to construct 
		//   a new object 
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

	// #22 We need a handle submit function for our button
	const handleSubmit = (event) => {
		// We do need preventDefault because it has default behavior of
		//   refreshing the page. We don't want that
		event.preventDefault()


		// // #23 We need to make an axios call
		// 	// We are using are axios instance with predefined values,
		// 	// rather than just plain old axios
		// axios.post("http://localhost:8080/signin", data) // post SENDs data
		// 	.then(result => {
		// 		console.log(result.data)
		// 		// #26 Save the toke in local storage
		// 		localStorage.setItem("token", result.data.token)
		// 		// now that we have that token stored in local storage, 
		// 		//   we essentially have to send it as a header for any
		// 		//   subsequent requests
		// 		// we could do this by adding a 3rd param to post with a 
		// 		//   headers value of Authorization and 
		// 		//     localStorage.getItem("token")
		// 		//   That's kind of verbose though. We don't want to redefine
		// 		//     that every time we make an axios call.
		// 		//   Instead, we'll create a new folder (utils) and a new file (api.js)

		// 	})
		// 	.catch(err => {
		// 		setError(err.response.data.message)
		// 	})
		

		//  #23B Instead of calling axios post, we'll use api as a function
		//    in place of axios
		api()
			// Since base url is already set in api.js, just need "signin"
			.post("/signin", data)
			.then(result => {
				// Store our new token in local storage so it persists
				localStorage.setItem("token", result.data.token)
				// Token is a cryptographically defined string that says we are who we say 
				//   we are. It uses a timestamp as part of the generation.

				// #59 Redirect the user to their account page after logging in
				props.history.push("/account")
			})
			.catch(err => {
				setError(err.response.data.message)
			})
	}
	
	return (
		// #9 Return a form tag
		// #25 Don't forget to add handleSubmit to the form!
		<form onSubmit={handleSubmit}>
			{/* #21 Inside the component, we can write a simple ternary that says
			if error exists or something is in there that is undefined, show
			a div with className of error, and display the error */}
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