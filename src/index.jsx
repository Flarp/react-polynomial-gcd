import React from 'react';
import ReactDom from 'react-dom';

import {PolynomialCombiner} from "./polynomialCombiner.jsx"
import {CyclotomicFinder} from "./cyclotomicFinder.jsx"
import {InverseFinder} from "./inverseFinder.jsx"
import {GCDPage} from "./gcdProgram.jsx"

class Main extends React.Component {
	constructor(props) {
		super(props)
		const polynomialInputInstructions = <div>
			<p>To input a polynomial, enter a numerical coefficient to the left of the term. <br></br>
			If you need a higher power term, you can press the "Add Term To Polynomial" button underneath the input to add another term.
			You can reset the polynomials back to zero by pressing the "Reset" button.</p>
			
		</div>
		const fieldInputInstructions = <div>
			<p>You can change the field the polynomial will be computed in by selecting the dropdown next to "Field" and choosing from either the field of rational numbers or integers modulo a prime number</p>
		</div>
		this.options = {
			combiner: {
				title: "Polynomial Combiner",
				description: "Perform operations on two polynomials within a specified field",
				instructions: <div>
					<p>Enter a polynomial into each polynomial input, select a computation from the "Operation" dropdown, and then compute it with the "Perform operation" button</p>
					<p>You can compute this operation modulo a polynomial by pressing the P(x) button down below. This will create a third polynomial input that you can adjust as you see fit which will serve as the modulus for the desired operation.</p>
					{polynomialInputInstructions}
					{fieldInputInstructions}
				</div>,
				component: <PolynomialCombiner/>
			},
			gcd: {
				title: "Greatest Common Divisor",
				description: "Find the greatest common divisor between two polynomials within a specified field",
				instructions: <div>
					Input the coefficients for the two polynomials listed and the field this computation will be run under, and then hit "Calculate GCD" at the bottom to print the result.
					{polynomialInputInstructions}
					{fieldInputInstructions}
				</div>,
				component: <GCDPage/>
			},
			inverse: {
				title: "Inverse",
				description: "Find the unit (multiplicative inverse) of a polynomial within a specified field",
				instructions: <div>
					<p>Input the polynomial you would like to find the inverse of in the left-hand (Polynomial) polynomial input, and the modulus for the field (p(x) with F/(p(x)) in the right-hand (Modulus) polynomial input. Then, hit "Compute Inverse" to find the inverse of the given polynomial, if one exists.</p>
					{polynomialInputInstructions}
					{fieldInputInstructions}
				</div>,
				component: <InverseFinder/>
			},
			cyclotomic: {
				title: "Cyclotomic Polynomials",
				description: "Find the nth cyclotomic polynomial",
				component: <CyclotomicFinder/>,
				instructions: <p>Type a natural number n into the input field to get the nth cyclotomic polynomial</p>
			}
		}
		this.state = {current: "combiner"}
	}
	
	render() {
		return (<div>
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous"/>
			<div className="jumbotron">
				<h1 className="display-4">{this.options[this.state.current].title}</h1>
				<p className="lead center">{this.options[this.state.current].description}</p>
				<br></br>
				<div style={{textAlign: "center"}}>{this.options[this.state.current].instructions}</div>
				<nav className="nav" style={{display: "flex", justifyContent: "center"}}>
					{Object.keys(this.options).map(opt => <a className="nav-link" onClick={_ => this.setState({current: opt})}>{this.options[opt].title}</a>)}
				</nav>
				<hr/>
			</div>
			{this.options[this.state.current].component}
		</div>)
	}
}

ReactDom.render(<Main/>, document.getElementById("main"))
				
			

