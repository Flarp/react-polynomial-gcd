import React from "react"
import ReactDOM from "react-dom"

import {PolynomialComponent} from "./polynomialComponent.jsx"
import {FieldSelector} from "./fieldSelector.jsx"
import {GCDComponent} from "./gcdComponent.jsx"

class InverseFinder extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			field: "q",
			polynomials: [[0], [0]]
		}
	}
	render() {