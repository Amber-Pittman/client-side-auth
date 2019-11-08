// #48 Disallow user to be on the account page if they're not currently 
//   logged in

// #49 Import react
import React from "react"

// #53 Make ProtectedRoute a HOC by returning the Route component or
//     or a different component called Redirect
import { Route, Redirect } from "react-router-dom"


// #50 Create a ProtectedRoute for components that require the token
function ProtectedRoute(props) {
	// We are essentially duplicating "props" here,
	// but excluding the value of "component".

	const {  // #55 Destructure from props
		component: Component,
		...rest
	} = props // essentially saying to take this props obj, remove the component value from
				// it & assign it to the variable name of Component. And then everything else
				// besides Component is stored in the variable called `rest` 

	return (
		// Since we can't have both a "component" and a "render" prop,
		// use our copy of props without "component"
		// #54 add render to Route
		// #56 After destructuring from props, you can now spread the rest variable b/c we
		//		don't want to put both component and render on the Route component. We only 
		//		want to use 1 of them. 
		//		If we did ...props instead, it would use both component and render. Not what we
		//		want. 
		//  #57 Don't forget to add the value of renderProps to render in the cb
		<Route {...rest} render={(renderProps) => {
			// Use a render prop so our component is computed,
			// allowing our token value to be set and deleted over time

			// #58 Write an if statement - if that token exists, we want to return our Component
			//		with the renderProps spread in there. Otherwise, if there is no token,
			//		we want to return the Redirect component and point the user to signin. 
			if (localStorage.getItem("token")) {
				// We are logged in, so render the component as normal
				// Passing "renderProps" so "Component" has access to all
				// the React Router stuff
				return <Component {...renderProps} />
			} else {
				// We are not logged in, so redirect to the signin page
				return <Redirect to="/signin" />
			}
		}} />
	)
}

export default ProtectedRoute