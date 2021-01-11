export const mod = (n, p) => ((n % p) + p) % p

export const primesUnder = n => {
	const primes = (new Array(n).fill(0)).map((_, i) => i+1)
    for (let i = 1; i < primes.length; i++) {
        const reali = i + 1
        if (primes[i] !== 0) {
            for (let k = (i*2)+1; k < primes.length; k += reali) {
                primes[k] = 0
            }
        }
    }
    return primes.filter(n => n !== 0).slice(1)
}
