import {mod, primesUnder} from "./helperMath.js"

// borrowed from https://www.nickang.com/2018-01-17-how-to-clone-class-instance-javascript/
// cloning ES6 classes is nightmarish and needs extra code
function cloneObj(original) {
  let copied = Object.assign( Object.create( Object.getPrototypeOf(original) ), original ); 
  return copied;
}

export class Polynomial {
  // inp is of either an array in the form [[degree, coefficient]]
  // or a degree of a polynomial that is initialized to 0x^n for all n < degree
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
	this.zeroOut()
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
	const length = rhs.polynomial.length > this.polynomial.length ? rhs.polynomial.length : this.polynomial.length
    let ret = new Polynomial(length, this.p)
    for (let i = 0; i < length; i++) {
      ret.polynomial[i] = (this.polynomial[i] || 0) + (rhs.polynomial[i] || 0)
    }
    ret.zeroOut()
    return ret
  }
  
  multiplyByTerm(exponent, coef) {
    const degree = this.degree()
    const ret = new Polynomial(degree + exponent, this.p)
	for (let i = 0; i < exponent; i++) {
		ret.polynomial[i] = 0
	}
    for (let i = 0; i <= degree; i++) {
      ret.polynomial[i + exponent] = this.polynomial[i] * coef
    }
    ret.zeroOut()
    return ret
  }
  
  multiply(rhs) {
	  const newDeg = this.degree() + rhs.degree()
	  console.log(newDeg, this.degree(), rhs.degree())
	  let ret = new Polynomial(newDeg, this.p)
	  for (let k = 0; k <= newDeg; k++) {
		  let sum = 0
		  for (let i = 0; i <= k; i++) {
			sum += (this.polynomial[i] || 0) * (rhs.polynomial[k - i] || 0)
		  }
		  ret.polynomial[k] = sum
	  }
	  ret.zeroOut()
	  return ret
  }
  
  // while a polynomial f(x) = 0 has degree -Infinity, we make it the value
  // -0 so it can still be used as zero in arithmetic but JS will treat it differently
  degree() {
    return this.polynomial.length > 0 ? this.polynomial.length - 1 : -0
  }
  
  modulo(b) {
	return this.divide(b)[0]  
  }
  
  divide(_b) {
    let r = cloneObj(this)
	let b = cloneObj(_b)
    let q = new Polynomial(1, this.p)

	// by using Object.is(), 0 !== -0
    while (r.degree() > b.degree() || Object.is(r.degree(), b.degree())) {
      const bLead = b.leadingTerm()
      let cancel = 0
      if (this.p === "q") {
        cancel = -(r.leadingTerm()/bLead)
      } else {
        cancel = this.units[mod(bLead, this.p)] * -1 * mod(r.leadingTerm(), this.p)
      }
      let qTemp = [r.degree() - b.degree(), cancel]
      const qTemp2 = new Polynomial([qTemp], this.p)
	  
      let negB = b.multiplyByTerm(...qTemp)

      r = r.add(negB)
	  
	  // add the proper term (negated in normal long division)
	  qTemp[1] *= -1
	  const qTemp3 = new Polynomial([qTemp], this.p)
	  q = q.add(qTemp3)
    }
    return [r, q]
  }
  
  // clean up function to ensure polynomial is in valid state
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
	
	// TODO: doesn't work yet for values when there are consecutive 0x^n
    while (i >= 0) {
      if (this.polynomial[i] !== 0) {
		const abs = Math.abs(this.polynomial[i])
        str += `${abs === 1 ? "" : abs}x^${i}`
        if (i !== 0) {
          str += Math.sign(this.polynomial[i-1]) === -1 ? " - " : " + "
        }
      }
      i--
    }
    return str
  }
  
  static gcd(_a, _b) {
	let a = cloneObj(_a)
	let b = cloneObj(_b)
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
  
  static extendedGCD(_a, _b) {
	  let a = cloneObj(_a)
	  let b = cloneObj(_b)
	  
	  if (b.greaterThan(a)) {
		let temp = a
		a = b
		b = temp
	  }
	  const r = [a, b]
	  const s = [new Polynomial([[0, 1]], a.p), new Polynomial([[0 ,0]], a.p)]
	  const t = [new Polynomial([[0, 0]], a.p), new Polynomial([[0 ,1]], a.p)]
	  
	  while (!b.isZero()) {
		let temp = b
		let q
		[b, q] = a.divide(b)
		
		let tempR = q.multiply(b).multiplyByTerm(0, -1)
		tempR = tempR.add(r[0])
		
		let tempS = q.multiply(s[1]).multiplyByTerm(0, -1)
		tempS = tempS.add(s[0])
		
		let tempT = q.multiply(t[1]).multiplyByTerm(0, -1)
		tempT = tempT.add(t[0])
		
		r.push(tempR)
		r.shift()
		s.push(tempS)
		s.shift()
		t.push(tempT)
		t.shift()
		
		a = temp
	  }
	  return [a.monik(), s[0], t[0]]
  }

  static cyclotomic(n) {
	  let poly = new Polynomial(1)
	  const p = n/2
	  const under = primesUnder(n + 1)
	  if (n === 1) {
		return new Polynomial([[0, -1], [1, 1]])
	  } else if (under.includes(n)) {
		for (let i = 0; i < n; i++) {
			poly = poly.add(new Polynomial([[i, 1]]))
	    }
		return poly
	  } else if (n !== 4 && under.includes(p)) {
		for (let i = 0; i < p; i++) {
		  poly = poly.add(new Polynomial([[i, Math.pow(-1, i)]]))
	    }
		return poly
	  } else {
		poly = new Polynomial([[0, -1], [n, 1]])
		for (let i = 1; i < n; i++) {
		  if ((n % i) === 0) {
			  poly = poly.divide(Polynomial.cyclotomic(i))[1]
		  } 
		}
		return poly
	  }
  }

}