import React from "react"

export class FieldSelector extends React.Component {
  constructor(props) {
    super(props)
    this.primes = (new Array(100).fill(0)).map((_, i) => i+1)
    for (let i = 1; i < this.primes.length; i++) {
        const reali = i + 1
        if (this.primes[i] !== 0) {
            for (let k = (i*2)+1; k < this.primes.length; k += reali) {
                this.primes[k] = 0
            }
        }
    }
    this.primes = this.primes.filter(n => n !== 0).slice(1)
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