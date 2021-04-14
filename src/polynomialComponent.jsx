import React from "react"
import {MathComponent} from "mathjax-react"

export class PolynomialComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<div >{
        [...this.props.polynomial].reverse().map((coef, i) => 
          <div style={{display: "inline-block"}} key={i}>
            <input style={{display: "inline-block", width: "auto"}} className="form-control" type="text" value={coef} onChange={e => this.props.handle(e, this.props.polynomial.length - i - 1)} size="2"/>
		<MathComponent display={false} tex={`x^{${this.props.polynomial.length - i - 1}}${this.props.polynomial.length - i - 1 !== 0 ? " + " : ""}`}/>
          
          </div>
        )
      }
        <br></br><button onClick={this.props.add} className="btn btn-success">Add Term to Polynomial</button></div>)
  }
}
