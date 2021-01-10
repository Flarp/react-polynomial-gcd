import {Polynomial} from "../src/polynomial.js"
import {mod, primesUnder} from "../src/helperMath.js"

import assert from "assert"

describe("Helper Math", () => {
	describe("primesUnder()", () => {
		it("should calculate all primes under a given number", () => {
			assert.deepEqual(primesUnder(10), [2,3,5,7])
		})
	})
	describe("mod()", () => {
		it("modulo of two positive numbers", () => {
			assert.equal(mod(5, 3), 2)
		})
		it("modulo of a negative number and a positive base", () => {
			assert.equal(mod(-5, 3), 1)
		})
	})
})

describe("Polynomials", () => {
	const qGCD = new Polynomial([[0, 1], [1, 1]])
	
	describe("addition", () => {
		it("addition under Q", () => {
			const q1 = new Polynomial([[0, -2], [1, -1], [2, 1]])
			const q2 = new Polynomial([[0, 2], [1, 3], [2, 1]])
			const qAdd = new Polynomial([[0, 0], [1, 2], [2, 2]])
			assert.deepEqual(q1.add(q2), qAdd)
		})
		
		it("addition under Z_p", () => {
			const z1 = new Polynomial([[0, 1], [1, 2], [2, 1]], 3)
			const z2 = new Polynomial([[0, 2], [1, 0], [2, 1]], 3)
			const zAdd = new Polynomial([[0, 0], [1, 2], [2, 2]], 3)
			assert.deepEqual(z1.add(z2), zAdd)
		})
	})
	
	describe("multiplication", () => {
		
	})
	
	describe("division and modulus", () => {
		it("division without remainder in Q", () => {
			const dividend = new Polynomial([[0, -1], [4, 1]])
			const divisor = new Polynomial([[0, 1], [2, 1]])
			const expQuotient = new Polynomial([[0, -1], [2, 1]])
			
			const [remainder, quotient] = dividend.divide(divisor)
			
			assert.deepEqual(quotient, expQuotient)
			assert.deepEqual(remainder, new Polynomial(1))
		})
		
		it("division without remainder in Z_p", () => {
			const dividend = new Polynomial([[0, -1], [3, 1]], 2)
			const divisor = new Polynomial([[0, 1], [1, 3], [2, 1]])
			
			const expQuotient = new Polynomial([[0, -1], [1, 1]], 2)
			
			const [remainder, quotient] = dividend.divide(divisor)
			console.log(expQuotient.print())
			
			assert.deepEqual(quotient, expQuotient)
			assert.deepEqual(remainder, new Polynomial(1, 2))
		})
	})
	
	describe("standard and extended GCD", () => {
		
	})
	
	describe("cyclotomic polynomials", () => {
		it("nth cyclotomic polynomial where n is prime", () => {
			const cycloSeven = new Polynomial([0,1,2,3,4,5,6].map(deg => [deg, 1]))
			const cycloEleven = new Polynomial([0,1,2,3,4,5,6,7,8,9,10].map(deg => [deg, 1]))
			assert.deepEqual(Polynomial.cyclotomic(7), cycloSeven)
			assert.deepEqual(Polynomial.cyclotomic(11), cycloEleven)
		})
		it("nth cyclotomic polynomial where n/2 is prime", () => {
			const cycloSix = new Polynomial([0,1,2].map(deg => [deg, Math.pow(-1, deg)]))
			const cycloTen = new Polynomial([0,1,2,3,4].map(deg => [deg, Math.pow(-1, deg)]))
			assert.deepEqual(Polynomial.cyclotomic(6), cycloSix)
			assert.deepEqual(Polynomial.cyclotomic(10), cycloTen)
		})
		
		it("nth cyclotomic polynomial where n is otherwise composite", () => {
			const cycloNine = new Polynomial([[0, 1], [3, 1], [6, 1]])
			const cycloSixteen = new Polynomial([[0, 1], [8, 1]])
			assert.deepEqual(Polynomial.cyclotomic(9), cycloNine)
			assert.deepEqual(Polynomial.cyclotomic(16), cycloSixteen)
		})
	})
})
