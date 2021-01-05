import React from "react"

export const PrettyPolynomial = props => {
  let polynomial = props.polynomial.polynomial
  return (<div style={{display: "inline-block"}}>{[...polynomial].reverse().map((term, i) => 
      <p style={{display: "inline-block"}}>{term}x<sup>{polynomial.length - i - 1}</sup>{polynomial.length - i - 1 !== 0 ? " + " : ""}</p>
  )}</div>)
}