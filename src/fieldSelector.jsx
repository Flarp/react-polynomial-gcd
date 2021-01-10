import React from "react"

import {primesUnder} from "./helperMath.js"

export class FieldSelector extends React.Component {
  constructor(props) {
    super(props)
    this.primes = primesUnder(100)
  }
  
  render() {
    return (<div>
      <select onChange={this.props.handleChange}>
        <option value="q">ℚ</option>
        {this.primes.map(prime => <option value={prime} key={prime}>ℤ/{prime}</option>)}
      </select>
      </div>)
  }
}