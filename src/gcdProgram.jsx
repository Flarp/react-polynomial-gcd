import React from 'react';
//import ReactDom from 'react-dom';

import {PolynomialStateComponent} from "./polynomialStateComponent.jsx"
import {PolynomialComponent} from "./polynomialComponent.jsx"
import {PrettyPolynomial} from "./prettyPolynomial.jsx"
import {FieldSelector} from "./fieldSelector.jsx"
import {Polynomial} from "./polynomial.js"


export class GCDPage extends PolynomialStateComponent {  
  render() {
	let GCD = null
	if (this.state.updateDisplay) {
		let polynomials = this.state.polynomials.map(halfPoly => 
		  new Polynomial(halfPoly.map((term, i) => [i, Number(term)]), this.state.field)
		)
		let result = Polynomial.gcd(...polynomials)
		GCD = <PrettyPolynomial polynomial={result}/>
	}
    return <div><div style={{display: "flex", justifyContent: "space-around"}}>{this.state.polynomials.map((poly, i) =>
        <div><PolynomialComponent polynomial={poly} handle={this.handle.bind(this, i)} add={this.add.bind(this, i)} key={i}/></div>
      )}</div>
      <br></br>
      <FieldSelector handleChange={this.updateUnits.bind(this)}/>
<center>
      <br></br><button onClick={_ => this.setState({polynomials: [[0],[0]], updateDisplay: false})} className="btn btn-danger">Reset</button>
      <br></br><button onClick={_ => this.setState({updateDisplay: true})} className="btn btn-primary">Calculate GCD</button>
		  </center>
      {GCD}
      </div>
  }
}

//ReactDom.render(<GCDPage/>, document.getElementById("main"))
