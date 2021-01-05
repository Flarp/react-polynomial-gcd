const mod = (n, p) => ((n % p) + p) % p

// borrowed from https://www.nickang.com/2018-01-17-how-to-clone-class-instance-javascript/
// cloning ES6 classes is nightmarish and needs extra code
function cloneObj(original) {
  let copied = Object.assign( Object.create( Object.getPrototypeOf(original) ), original ); 
  return copied;
}

export class Polynomial {
  constructor(inp, p) {
    if (Array.isArray(inp)) {
      let inpArr = inp
      let degrees = inpArr.map(e => e[0])
      let degree = degrees.reduce((prev, curr) => prev > curr ? prev : curr)
      this.polynomial = (new Array(degree+1)).fill(0)
      for (let element of inpArr) {
        const coef = element[1]
        const exponent = element[0]
        this.polynomial[exponent] = coef
      }
    } else {
      let degree = inp
      this.polynomial = (new Array(degree)).fill(0)
    }
	this.p = p || "q"
	
	// generate all multiplicative inverses in the field
	this.units = []
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
	console.log(this.units, this.p)
  }
  
  greaterThan(other) {
    if (this.polynomial.length > other.polynomial.length) return true
    if (this.polynomial.length < other.polynomial.length) return false
    const len = this.polynomial.length
    for (let i = this.polynomial.length - 1; i >= 0; i--) {
      if (this.polynomial[i] > other.polynomial[i]) {
        return true
      }
    }
    return false
  }
  
  equal(other) {
    return (this.polynomial.length === other.polynomial.length) && this.polynomial.every((e, i) => e === other.polynomial[i]) 
  }
  
  add(rhs) {
    let ret = new Polynomial(rhs.polynomial.length > this.polynomial.length ? rhs.polynomial.length : this.polynomial.length, this.p)
    for (let i = 0; i < ret.polynomial.length; i++) {
      ret.polynomial[i] = (this.polynomial[i] || 0) + (rhs.polynomial[i] || 0)
    }
    ret.zeroOut()
    return ret
  }
  
  multiplyByTerm(exponent, coef) {
    const degree = this.degree()
    const ret = new Polynomial(degree + exponent, this.p)
    for (let i = 0; i <= degree; i++) {
      ret.polynomial[i + exponent] = this.polynomial[i] * coef
    }
    ret.zeroOut()
    return ret
  }
  
  multiply(rhs) {
	  const newDeg = this.degree() + rhs.degree()
	  let ret = new Polynomial(newDeg)
	  for (let k = 0; k <= newDeg; k++) {
		  let sum = 0
		  for (let i = 0; i <= k; i++) {
			sum += (this.polynomial[i] || 0) * (rhs.polynomial[k - i] || 0)
		  }
		  ret.polynomial[k] = sum
	  }
  }
  
  degree() {
    return this.polynomial.length - 1
  }
  
  modulo(b) {
    let r = cloneObj(this)
    let q = new Polynomial(1, this.p)

    while (r.degree() >= b.degree()) {
	  console.log("sweet caroline", r.print(), b.print())
      const bLead = b.leadingTerm()
      let cancel = 0
      if (this.p === "q") {
        cancel = -(r.leadingTerm()/bLead)
      } else {
        cancel = this.units[mod(bLead, this.p)] * -1 * mod(r.leadingTerm(), this.p)
      }
      let qTemp = [r.degree() - b.degree(), cancel]
      const qTemp2 = new Polynomial([qTemp], this.p)
      q = q.add(qTemp2)
      let negB = b.multiplyByTerm(...qTemp)

      r = r.add(negB)
    }
    return r
  }
  
  zeroOut() {
    let i = 0
    for (i = 0; i < this.polynomial.length; i++) {
	  // account for rounding errors in fp division
      if (Math.abs(this.polynomial[i]) < (1e-10)) this.polynomial[i] = 0
      const round = Math.round(this.polynomial[i])
      if (Math.abs(this.polynomial[i] - round) < (1e-10)) this.polynomial[i] = round
	  
	  // compute modulo of each term if we're in Z_p
      if (this.p !== "q") {
        this.polynomial[i] = mod(this.polynomial[i], this.p)
      }
    }
	
	// ensure a polynomial with degree >= 1 does not have leading term of 0
    i = this.polynomial.length - 1;
    while (this.polynomial[i] === 0 && i >= 0) {
      this.polynomial.splice(i, 1)
      i--
    }
  }
  
  isZero() {
    return this.polynomial.every(a => a === 0)
  }
  
  leadingTerm() {
    return this.polynomial[this.polynomial.length-1]
  }
  
  monik() {
    return this.multiplyByTerm(0, this.p === "q" ? 1/this.leadingTerm() : this.units[this.leadingTerm()])
  }
  
  print() {
    let str = ""
    let i = this.polynomial.length - 1
    while (i >= 0) {
      if (this.polynomial[i] !== 0) {
        str += `${this.polynomial[i] === 1 ? "" : this.polynomial[i]}x^${i}`
        if (i !== 0) {
          str += " + "
        }
      }
      i--
    }
    return str
  }
  
  static gcd(a, b) {
	if (b.greaterThan(a)) {
		let temp = a
		a = b
		b = temp
	}
	while (!b.isZero()) {
		let temp = b
		b = a.modulo(b)
		a = temp
	}
	return a.monik()

  }

}