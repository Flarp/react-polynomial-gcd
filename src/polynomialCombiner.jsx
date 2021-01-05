import React from 'react';
import ReactDom from 'react-dom';

import {PolynomialStateComponent} from "./polynomialStateComponent.jsx"
import {PolynomialComponent} from "./polynomialComponent.jsx"
import {GCDComponent} from "./gcdComponent.jsx"
import {FieldSelector} from "./fieldSelector.jsx"

class PolynomialCombiner extends PolynomialStateComponent {
	render() {
		return (<div>
			{this.state.polynomials.map((poly, i) => <PolynomialComponent polynomial={poly} handle={this.handle.bind(this, i)} add={this.add.bind(this, i)} key={i}/>)}
		</div>)
	}
}

ReactDom.render(<PolynomialCombiner/>, document.getElementById("main"))