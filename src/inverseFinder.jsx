import React from "react"
import ReactDom from "react-dom"

import {PolynomialStateComponent} from "./polynomialStateComponent.jsx"
import {PolynomialComponent} from "./polynomialComponent.jsx"
import {PrettyPolynomial} from "./prettyPolynomial.jsx"
import {FieldSelector} from "./fieldSelector.jsx"
import {Polynomial} from "./polynomial.js"

class InverseFinder extends PolynomialStateComponent {
	render() {
		return (<div>
			{this.state.polynomials.slice(0, 2).map((poly, i) => <PolynomialComponent polynomial={poly} handle={this.handle.bind(this, i)} add={this.add.bind(this, i)} key={i}/>)}
			<FieldSelector handleChange={this.updateUnits.bind(this)}/>
			<br></br><button onClick={_ => this.setState({polynomials: [[0],[0]], updateDisplay: false})}>Reset</button>
		    <br></br><button onClick={_ => this.setState({updateDisplay: true})}>Perform Operation</button>
			{this.state.updateDisplay ? <ExtendedRender polynomials={this.state.polynomials} field={this.state.field}/> : ""}
		</div>)
	}
}

const ExtendedRender = props => {
	let polynomials = props.polynomials.map(halfPoly => 
	  new Polynomial(halfPoly.map((term, i) => [i, Number(term)]), props.field)
	)
	const [gcd, inverse, v] = Polynomial.extendedGCD(polynomials[0], polynomials[1])
	let error = null
	console.log(v.print(), v.degree(), gcd.print(), gcd.degree(), inverse.print(), inverse.degree())
	if (gcd.degree() !== 0) error = <p style={{textColor: "red"}}> ERROR: No inverse for given polynomial in given ring</p>
	return (<div>
		<p>gcd(a, b) = au + bv</p>
		<p>Inverse = {error || <PrettyPolynomial polynomial={inverse}/>}</p>
	</div>)
}

ReactDom.render(<InverseFinder/>, document.getElementById("main"))