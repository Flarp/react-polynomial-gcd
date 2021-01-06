import React from 'react';
import ReactDom from 'react-dom';

import {PolynomialStateComponent} from "./polynomialStateComponent.jsx"
import {PolynomialComponent} from "./polynomialComponent.jsx"
import {PrettyPolynomial} from "./prettyPolynomial.jsx"
import {FieldSelector} from "./fieldSelector.jsx"
import {Polynomial} from "./polynomial.js"

class PolynomialCombiner extends PolynomialStateComponent {
	constructor(props) {
		super(props)
		this.state = {
		  polynomials: [[-2,-1],[-1, 1, 1],[0]],
		  updateDisplay: false,
		  showPx: false,
		  field: "q",
		  operation: "addition",
		}
	}
	render() {
		return (<div>
			{this.state.polynomials.slice(0, 2).map((poly, i) => <PolynomialComponent polynomial={poly} handle={this.handle.bind(this, i)} add={this.add.bind(this, i)} key={i}/>)}
			<br></br>
			<select onChange={e => this.setState({operation: e.target.value})}>
				<option value="addition">Add</option>
				<option value="multiply">Multiply</option>
			</select>
			<br></br>
  		    <FieldSelector handleChange={this.updateUnits.bind(this)}/>
			<br></br>
			<button onClick={_ => this.setState({
				showPx: !this.state.showPx, 
				polynomials: [this.state.polynomials[0], this.state.polynomials[1], [0]]
			})}>P(x)</button>
			{this.state.showPx ? <PolynomialComponent polynomial={this.state.polynomials[2]} handle={this.handle.bind(this, 2)} add={this.add.bind(this, 2)}/> : ""}
		    <br></br><button onClick={_ => this.setState({polynomials: [[0],[0],[0]], updateDisplay: false})}>Reset</button>
		    <br></br><button onClick={_ => this.setState({updateDisplay: true})}>Perform Operation</button>
			{(() => { if (this.state.updateDisplay) {
				let polynomials = this.state.polynomials.map(halfPoly => 
				  new Polynomial(halfPoly.map((term, i) => [i, Number(term)]), this.state.field)
				)
				console.log(polynomials)
				let result = this.state.operation === "addition" ? polynomials[0].add(polynomials[1]) : polynomials[0].multiply(polynomials[1])
				console.log(result, this.state.operation)
				if (!polynomials[2].isZero()) result = result.modulo(polynomials[2])
				return <PrettyPolynomial polynomial={result}/>
			}})()}
		</div>)
	}
}

ReactDom.render(<PolynomialCombiner/>, document.getElementById("main"))