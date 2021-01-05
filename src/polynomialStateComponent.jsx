import React from 'react';

import {PolynomialComponent} from "./polynomialComponent.jsx"
import {GCDComponent} from "./gcdComponent.jsx"
import {FieldSelector} from "./fieldSelector.jsx"

export class PolynomialStateComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      polynomials: [[-2,-1],[-1, 1, 1]],
      updateDisplay: false,
      field: "q",
    }
  }
  add(index) {
    let polynomials = this.state.polynomials
    polynomials[index].push(0)
    this.setState({polynomials, updateDisplay: false})
  }
  handle(pi, e, i) {
    let polynomials = this.state.polynomials
    polynomials[pi][i] = e.target.value
    this.setState({polynomials, updateDisplay: false})
  }
  
  updateUnits(e) {
	const modulo = Number(event.target.value)
	this.setState({field: modulo || "q", updateDisplay: false})
  }
}