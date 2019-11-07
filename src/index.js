import React from "react"
import ReactDOM from "react-dom"

// #1 install react router
import { BrowserRouter } from "react-router-dom"
import App from "./components/App"

ReactDOM.render(
	// #2 Wrap app in browser component
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root"),
)
