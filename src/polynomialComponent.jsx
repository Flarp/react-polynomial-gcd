import React from "react"

export class PolynomialComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<div >{
        [...this.props.polynomial].reverse().map((coef, i) => 
          <div style={{display: "inline-block"}} key={i}>
            <input style={{display: "inline-block"}} type="text" value={coef} onChange={e => this.props.handle(e, this.props.polynomial.length - i - 1)} size="2"/>
            <p style={{display: "inline-block"}} >x<sup>{this.props.polynomial.length - i - 1}</sup>{this.props.polynomial.length - i - 1 !== 0 ? " + " : ""} </p>
          
          </div>
        )
      }
        <br></br><button onClick={this.props.add}>Add Term to Polynomial</button></div>)
  }
}