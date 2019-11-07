import "./App.css"
import React from "react"

// #3 Define some routes by importing from rrd
import { Link, Route, withRouter } from "react-router-dom"

import { getToken } from "../utils/api"
import ProtectedRoute from "./ProtectedRoute"

// #7 import the SignIn component that was created
import Signin from "./Signin"
import Account from "./Account"
import Logout from "./Logout"

function App() {
	const signedIn = getToken()

	return (
		<div className="wrapper">
			{/*  #4 Let's create a nav tag and create some links */}
			<nav>
				<Link to="/">Home</Link>
				
				{/* We can conditionally show links if logged in or not */}
				{!signedIn && <Link to="/signin">Sign In</Link>}
				{signedIn && <Link to="/account">My Account</Link>}
				{signedIn && <Link to="/logout">Logout</Link>}
			</nav>

			{/* #5 Define some routes */}
			{/* #8 Add Signin component to signin Route */}
			<Route exact path="/signin" component={Signin} />
			{/* These routes will require an auth token to be set, due to our handy HOC */}
			<ProtectedRoute exact path="/account" component={Account} />
			<ProtectedRoute exact path="/logout" component={Logout} />
		</div>
	)
}

export default withRouter(App)
