// #66 Create new component called Logoout

// #67 Import React and Redirect
import React from "react"
import { Redirect } from "react-router-dom"

// #68 Define the function
function Logout(props) {
	// #70  Nothing has to happen on the server to log out,
	// 		just delete the token
	localStorage.removeItem("token")
	
	// #71 Redirect user to the signin page once they're logged out
	return <Redirect to="/signin" />
}

// #69 Export Logout (of course)
export default Logout