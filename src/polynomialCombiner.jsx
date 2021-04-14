import React from 'react';
//import ReactDom from 'react-dom';

import {PolynomialStateComponent} from "./polynomialStateComponent.jsx"
import {PolynomialComponent} from "./polynomialComponent.jsx"
import {PrettyPolynomial} from "./prettyPolynomial.jsx"
import {FieldSelector} from "./fieldSelector.jsx"
import {Polynomial} from "./polynomial.js"

export class PolynomialCombiner extends PolynomialStateComponent {
	constructor(props) {
		super(props)
		this.actions = [
			["add", "Add"],
			["multiply", "Multiply"],
			["quotient", "Divide"],
			["modulo", "Remainder"]
		]
		this.state = {
		  polynomials: [[-2,-1],[-1, 1, 1],[0]],
		  updateDisplay: false,
		  showPx: false,
		  field: "q",
		  operation: "add",
		}
	}
	render() {
		return (<div>
    			<div style={{display: "flex", justifyContent: "space-around"}}>
			{this.state.polynomials.slice(0, 2).map((poly, i) => <PolynomialComponent polynomial={poly} handle={this.handle.bind(this, i)} add={this.add.bind(this, i)} key={i}/>)}
			</div>
			<br></br>
		<center><div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
			<p>Operation: </p>
			<select onChange={e => this.setState({operation: e.target.value, updateDisplay: false})} className="form-control" style={{width: "auto"}}>
				{this.actions.map(action => 
					<option value={action[0]}>{action[1]}</option>
				)}
			</select></div>
			<br></br>
  		    <FieldSelector handleChange={this.updateUnits.bind(this)}/>
			<br></br>
			<button className={"btn " + (this.state.showPx ? "btn-info" : "btn-secondary")}onClick={_ => this.setState({
				showPx: !this.state.showPx, 
				polynomials: [this.state.polynomials[0], this.state.polynomials[1], [0]]
			})}>P(x)</button>
			{this.state.showPx ? <PolynomialComponent polynomial={this.state.polynomials[2]} handle={this.handle.bind(this, 2)} add={this.add.bind(this, 2)}/> : ""}
		    <br></br><button onClick={_ => this.setState({polynomials: [[0],[0],[0]], updateDisplay: false})} className="btn btn-danger">Reset</button>
		    <br></br><button onClick={_ => this.setState({updateDisplay: true})} className="btn btn-primary">Perform Operation</button>
		</center>
			{(() => { if (this.state.updateDisplay) {
				let polynomials = this.state.polynomials.map(halfPoly => 
				  new Polynomial(halfPoly.map((term, i) => [i, Number(term)]), this.state.field)
				)

				// class functions are also object properties
				let result = polynomials[0][this.state.operation](polynomials[1])
				if (!polynomials[2].isZero()) result = result.modulo(polynomials[2])
				return <PrettyPolynomial polynomial={result}/>
			}})()}
		</div>)
	}
}

//ReactDom.render(<PolynomialCombiner/>, document.getElementById("main"))
