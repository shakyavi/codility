// A prime is a positive integer X that has exactly two distinct divisors: 1 and X. The first few prime integers are 2, 3, 5, 7, 11 and 13.

// A semiprime is a natural number that is the product of two (not necessarily distinct) prime numbers. The first few semiprimes are 4, 6, 9, 10, 14, 15, 21, 22, 25, 26.

// You are given two non-empty arrays P and Q, each consisting of M integers. These arrays represent queries about the number of semiprimes within specified ranges.

// Query K requires you to find the number of semiprimes within the range (P[K], Q[K]), where 1 ≤ P[K] ≤ Q[K] ≤ N.

// For example, consider an integer N = 26 and arrays P, Q such that:

//     P[0] = 1    Q[0] = 26
//     P[1] = 4    Q[1] = 10
//     P[2] = 16   Q[2] = 20
// The number of semiprimes within each of these ranges is as follows:

// (1, 26) is 10,
// (4, 10) is 4,
// (16, 20) is 0.
// Write a function:

// function solution(N, P, Q);

// that, given an integer N and two non-empty arrays P and Q consisting of M integers, returns an array consisting of M elements specifying the consecutive answers to all the queries.

// For example, given an integer N = 26 and arrays P, Q such that:

//     P[0] = 1    Q[0] = 26
//     P[1] = 4    Q[1] = 10
//     P[2] = 16   Q[2] = 20
// the function should return the values [10, 4, 0], as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..50,000];
// M is an integer within the range [1..30,000];
// each element of arrays P and Q is an integer within the range [1..N];
// P[i] ≤ Q[i].

const NON_PRIME_MARKER = -1

const semiPrimesFor = n => {
  const root = Math.floor(Math.sqrt(n))

  const sieve = new Array(n + 1).fill(undefined)

  const addToSet = (x, s) => {
    s.add(x)
    if (sieve[x] != null) {
      s.add(NON_PRIME_MARKER)
    }
  }

  const updateSieve = (i) => {
    for (let j = i * 2; j <= n; j += i) {
      const s = sieve[j] || new Set()
      addToSet(i, s)
      addToSet(j / i, s)
      sieve[j] = s
    }
  }

  for (let i = 2; i <= root; i++) {
    updateSieve(i)
  }

  return sieve
    .map((x, i) => [i, x])
    .filter(([i, x]) => x && !x.has(NON_PRIME_MARKER) && x.size <= 2)
    .map(([i]) => i)
}

// SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
// Detected time complexity:O(N * log(log(N)) + M)
// CORRECTNESS tests in 0.052s, 0.056s
// PERFORMANCE tests in 0.056, 0.184s, 0.228s, 0.232s
function semiPrimes(n, ps, qs) {
  const semis = semiPrimesFor(n)

  const buildPrefixList = (n, xs) => {
    const idx = new Array(n + 1).fill(0)
    let soFar = 0
    for (let i = 0; i < idx.length; i++) {
      if (xs.has(i)) {
        soFar++
      }
      idx[i] = soFar
    }
    return idx
  }

  const pl = buildPrefixList(n, new Set(semis))

  const semiPrimesIn = (s, e) => {
    return pl[e] - pl[s - 1]
  }

  return ps.map((p, i) => semiPrimesIn(p, qs[i]))
}

module.exports = semiPrimes;