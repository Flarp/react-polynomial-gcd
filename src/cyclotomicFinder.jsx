import React from "react"
//import ReactDom from "react-dom"

import {PrettyPolynomial} from "./prettyPolynomial.jsx"
import {Polynomial} from "./polynomial.js"

export class CyclotomicFinder extends React.Component {
	constructor(props) {
		super(props)
		this.state = { n: 1, update: false }
	}
	
	handleChange(e) {
		this.setState({update: false, n: Number(e.target.value)})
	}
	
	compute() {
		this.setState({update: true})
	}
	
	render() {
		return (<div>
			<input type="number" onChange={this.handleChange.bind(this)}/>
			<button className="btn btn-success" onClick={this.compute.bind(this)}>Get nth Cyclotomic Polynomial</button>
			{this.state.update ? <PrettyPolynomial polynomial={Polynomial.cyclotomic(this.state.n)}/> : ""}
		</div>)
	}
}

//ReactDom.render(<CyclotomicFinder/>, document.getElementById("main"))
