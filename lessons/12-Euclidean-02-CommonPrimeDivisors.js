// A prime is a positive integer X that has exactly two distinct divisors: 1 and X. The first few prime integers are 2, 3, 5, 7, 11 and 13.

// A prime D is called a prime divisor of a positive integer P if there exists a positive integer K such that D * K = P. For example, 2 and 5 are prime divisors of 20.

// You are given two positive integers N and M. The goal is to check whether the sets of prime divisors of integers N and M are exactly the same.

// For example, given:

// N = 15 and M = 75, the prime divisors are the same: {3, 5};
// N = 10 and M = 30, the prime divisors aren't the same: {2, 5} is not equal to {2, 3, 5};
// N = 9 and M = 5, the prime divisors aren't the same: {3} is not equal to {5}.
// Write a function:

// function solution(A, B);

// that, given two non-empty arrays A and B of Z integers, returns the number of positions K for which the prime divisors of A[K] and B[K] are exactly the same.

// For example, given:

//     A[0] = 15   B[0] = 75
//     A[1] = 10   B[1] = 30
//     A[2] = 3    B[2] = 5
// the function should return 1, because only one pair (15, 75) has the same set of prime divisors.

// Write an efficient algorithm for the following assumptions:

// Z is an integer within the range [1..6,000];
// each element of arrays A and B is an integer within the range [1..2,147,483,647].

// SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
// Detected time complexity:O(Z * log(max(A) + max(B))**2)
// CORRECTNESS tests in 0.052s, 0.056s
// PERFORMANCE tests in 0.068s, 0.076, 0.080s, 0.072s
function commonPrimeDivisors(xs, ys) {
    let count = 0
  
    for (let i = 0; i < xs.length; i++) {
      const x = xs[i]
      const y = ys[i]
  
      if (checkFactors(x, y)) {
        count++
      }
    }
  
    return count
  }
  
  const sameFactors = (xs, ys) => {
    for (const k of xs.keys()) {
      if (!ys.has(k)) {
        return false
      }
    }
  
    for (const k of ys.keys()) {
      if (!xs.has(k)) {
        return false
      }
    }
  
    return true
  }
  
  const isProductOf = (denom, n) => {
    let x = n
  
    while (x !== 1) {
      const gcdX = gcd(denom, x)
      if (gcdX === 1) {
        return false
      }
      x = x / gcdX
    }
  
    return true
  }
  
  const checkFactors = (x, y) => {
    if (x === y) {
      return true
    }
  
    const denom = gcd(x, y)
  
    if (!isProductOf(denom, x)) {
      return false
    }
  
    if (!isProductOf(denom, y)) {
      return false
    }
  
    return true
  }
  
  const gcdDiv = (x, y) => {
    if (x % y === 0) {
      return y
    }
  
    return gcdDiv(y, x % y)
  }
  
  const gcd = gcdDiv

  module.exports = commonPrimeDivisors