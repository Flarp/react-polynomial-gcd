import React from "react"

import {MathComponent} from "mathjax-react"

export const PrettyPolynomial = props => {
  let polynomial = props.polynomial
  return (<div><MathComponent tex={polynomial.print()}/></div>)
}