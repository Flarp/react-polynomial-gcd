import {mod} from "./helperMath.js"

export class Field {
	constructor(p) {
		this.units = []
		this.p = p
		if (this.p !== "q") {
			for (let i = 0; i < this.p; i++) {
				for (let k = i; k < this.p; k++) {
				  if ((i * k) % this.p === 1) {
					this.units[k] = i
					this.units[i] = k
				  }
				}
			}
		}
	}
	
	unitInvert(n) {
		return this.p === "q" ? 1/n : this.units[mod(n, this.p)]
	}
}