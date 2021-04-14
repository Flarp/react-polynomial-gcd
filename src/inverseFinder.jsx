import React from "react"
//import ReactDom from "react-dom"
import {MathComponent} from "mathjax-react"

import {PolynomialStateComponent} from "./polynomialStateComponent.jsx"
import {PolynomialComponent} from "./polynomialComponent.jsx"
import {PrettyPolynomial} from "./prettyPolynomial.jsx"
import {FieldSelector} from "./fieldSelector.jsx"
import {Polynomial} from "./polynomial.js"

const labels = ["Polynomial", "Modulus"]

export class InverseFinder extends PolynomialStateComponent {
	render() {
		return (<div>
			<div style={{display: "flex", justifyContent: "space-around"}}>
				{this.state.polynomials.slice(0, 2).map((poly, i) => <div><p>{labels[i]}</p><PolynomialComponent polynomial={poly} handle={this.handle.bind(this, i)} add={this.add.bind(this, i)} key={i}/></div>)}
			</div>
			<FieldSelector handleChange={this.updateUnits.bind(this)}/>
			<br></br>
			<center><button onClick={_ => this.setState({polynomials: [[0],[0]], updateDisplay: false})} className="btn btn-danger">Reset</button>
		    <br></br><button onClick={_ => this.setState({updateDisplay: true})} className="btn btn-primary">Compute Inverse</button>
			</center>
			{this.state.updateDisplay ? <ExtendedRender polynomials={this.state.polynomials} field={this.state.field}/> : ""}
		</div>)
	}
}

const ExtendedRender = props => {
	let polynomials = props.polynomials.map(halfPoly => 
	  new Polynomial(halfPoly.map((term, i) => [i, Number(term)]), props.field)
	)
	console.log(polynomials, "A B")
	let [gcd, v, inverse] = Polynomial.extendedGCD(polynomials[0], polynomials[1])
	let error = null
	console.log(v.print(), v.degree(), gcd.print(), gcd.degree(), inverse.print(), inverse.degree())
	if (gcd.degree() !== 0) error = <div style={{color: "red"}}> 
		ERROR: No inverse for given polynomial in given ring: <MathComponent tex=
			{`\\mathbb{${props.field === "q" ? "Q": "Z"}}_{${props.field !== "q" ? props.field : ""}}[x]/(${polynomials[1].print()})`}/>
	</div>
	inverse = inverse.quotient(gcd) // in case gcd is a constant term other than 1
	return (<div>
		<p>gcd(a, b) = au + bv</p>
		<div>Inverse = {error || <PrettyPolynomial polynomial={inverse}/>}</div>
	</div>)
}

//ReactDom.render(<InverseFinder/>, document.getElementById("main"))
