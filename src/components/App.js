import "./App.css"
import React from "react"

// #3 Define some routes by importing from rrd
import { Link, Route, withRouter } from "react-router-dom"
// #62 Import getToken from API
import { getToken } from "../utils/api"

// #51 import ProtectedRoute instead of Route
import ProtectedRoute from "./ProtectedRoute"

// #7 import the SignIn component that was created
import Signin from "./Signin"
// #47 import the Account component
import Account from "./Account"
// #73 Don't forget to import Logout
import Logout from "./Logout"

function App() {
	// #63 Create a variable to check if you are signed in
	const signedIn = getToken()

	return (
		<div className="wrapper">
			{/*  #4 Let's create a nav tag and create some links */}
			<nav>
				<Link to="/">Home</Link>
				
				{/* #19 Add a SignIn Link to the Navigation */}
				{/* #64 We can conditionally show links if logged in or not */}
				{!signedIn && <Link to="/signin">Sign In</Link>}

				{/* #45 Add an Account Link to the Navigation */}
				{signedIn && <Link to="/account">My Account</Link>}

				{/* #65 Add a Logout link - if you're signed in, show a Logout
					link */}
				{signedIn && <Link to="/logout">Logout</Link>}
			</nav>

			{/* #5 Define some routes */}
			{/* #8 Add Signin component to signin Route */}
			<Route exact path="/signin" component={Signin} />
			{/* These routes will require an auth token to be set, 
				 due to our handy HOC */}
			{/* #46 Create Link for Account
				#47 Add Account component to account Route
				#52 Change Route to ProtectedRoute */}
			<ProtectedRoute exact path="/account" component={Account} />

			{/* #72 Create a ProtectedRoute for Logout */}
			<ProtectedRoute exact path="/logout" component={Logout} />
		</div>
	)
}

export default withRouter(App)
