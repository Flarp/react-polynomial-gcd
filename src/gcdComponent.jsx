import React from "react"

import {Polynomial} from "./polynomial.js"
import {PrettyPolynomial} from "./prettyPolynomial.jsx"

export class GCDComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  
  shouldComponentUpdate(nextProps) {
    return nextProps.shouldCalculate
  }
  
  render() {
    let polynomials = this.props.polynomials.map(halfPoly => {
      let semiPoly = halfPoly.map((term, i) => [i, Number(term)])
      console.log(this.props.field)
      let finalPoly = new Polynomial(semiPoly, this.props.field)
      finalPoly.zeroOut()
      return finalPoly
    })
    //console.log(polynomials, "arr")
    let result = Polynomial.gcd(...polynomials)
    //console.log(result)
    return <PrettyPolynomial polynomial={result}/>
  }
}