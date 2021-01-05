import React from 'react';
import ReactDom from 'react-dom';

import {PolynomialStateComponent} from "./polynomialStateComponent.jsx"
import {PolynomialComponent} from "./polynomialComponent.jsx"
import {GCDComponent} from "./gcdComponent.jsx"
import {FieldSelector} from "./fieldSelector.jsx"

class GCDPage extends PolynomialStateComponent {  
  render() {
    return <div>{this.state.polynomials.map((poly, i) =>
        <PolynomialComponent polynomial={poly} handle={this.handle.bind(this, i)} add={this.add.bind(this, i)} key={i}/>
      )}
      <br></br>
      <FieldSelector handleChange={this.updateUnits.bind(this)}/>
      <br></br><button onClick={_ => this.setState({polynomials: [[0],[0]], updateDisplay: false})}>Reset</button>
      <br></br><button onClick={_ => this.setState({updateDisplay: true})}>Calculate GCD</button>
      
      {this.state.updateDisplay ? <GCDComponent polynomials={this.state.polynomials} shouldCalculate={this.state.updateDisplay} field={this.state.field}/> : ""}
      </div>
  }
}

ReactDom.render(<GCDPage/>, document.getElementById("main"))