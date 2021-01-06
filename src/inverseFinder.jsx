import React from "react"
import ReactDom from "react-dom"

import {PolynomialStateComponent} from "./polynomialStateComponent.jsx"
import {PolynomialComponent} from "./polynomialComponent.jsx"
import {FieldSelector} from "./fieldSelector.jsx"
import {GCDComponent} from "./gcdComponent.jsx"
import {Polynomial} from "./polynomial.js"

class InverseFinder extends PolynomialStateComponent {
	constructor(props) {
		super(props)
		this.state = {
			field: "q",
			polynomials: [[0], [0]]
		}
	}
	render() {
		const poly1 = new Polynomial([[0, 2], [1, 3], [2, 1]])
		const poly2 = new Polynomial([[0, -14], [1, -9], [2, 6], [3, 1]])
		console.log(Polynomial.extendedGCD(poly1, poly2))
		return <div></div>
	}
}

ReactDom.render(<InverseFinder/>, document.getElementById("main"))