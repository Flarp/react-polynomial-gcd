import React from "react"

import {primesUnder} from "./helperMath.js"

export class FieldSelector extends React.Component {
  constructor(props) {
    super(props)
    this.primes = primesUnder(100)
  }
  
  render() {
    return (<div style={{width: "auto", display: "flex", justifyContent: "center"}}>
      <p>Field: </p>
      <select className="form-select" style={{width: "auto"}} onChange={this.props.handleChange}>
        <option value="q">ℚ</option>
        {this.primes.map(prime => <option value={prime} key={prime}>ℤ/{prime}</option>)}
      </select>
      </div>)
  }
}
