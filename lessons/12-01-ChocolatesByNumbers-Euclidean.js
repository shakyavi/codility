// Two positive integers N and M are given. Integer N represents the number of chocolates arranged in a circle, numbered from 0 to N − 1.

// You start to eat the chocolates. After eating a chocolate you leave only a wrapper.

// You begin with eating chocolate number 0. Then you omit the next M − 1 chocolates or wrappers on the circle, and eat the following one.

// More precisely, if you ate chocolate number X, then you will next eat the chocolate with number (X + M) modulo N (remainder of division).

// You stop eating when you encounter an empty wrapper.

// For example, given integers N = 10 and M = 4. You will eat the following chocolates: 0, 4, 8, 2, 6.

// The goal is to count the number of chocolates that you will eat, following the above rules.

// Write a function:

// function solution(N, M);

// that, given two positive integers N and M, returns the number of chocolates that you will eat.

// For example, given integers N = 10 and M = 4. the function should return 5, as explained above.

// Write an efficient algorithm for the following assumptions:

// N and M are integers within the range [1..1,000,000,000].

// SOLUTION 1
// SCORE 75% (CORRECTNESS 100%; PERFORMANCE 50%;)
// CORRECTNESS tests in 0.052s, 0.056s
// failed large, extreme_large [TIMEOUT ERROR hard limit reached 6.000s] (2/4) PERFORMANCE tests in 0.056, 0.184s, 0.228s, 0.232s
function chocolatesByNumbersBruteForce(n, m0) {
  const m = m0 % n;
  const s = new Set();

  let i = 0;

  while (true) {
    if (s.has(i)) {
      return s.size;
    }

    s.add(i);

    i = (i + m) % n;
  }
}

const factorize = (n) => {
  const m = new Map();
  let x = n;
  const root = Math.floor(Math.sqrt(n));

  const incFactor = (x) => {
    const count = m.get(x) || 0;
    m.set(x, count + 1);
  };

  for (let i = 2; i <= root; i++) {
    if (x % i === 0) {
      x = x / i;
      incFactor(i);
      i--;
    }
  }

  if (x !== 1) {
    incFactor(x);
  }

  return m;
};

const joinWithMax = (xM, yM) =>
  Array.from(new Set([...xM.keys(), ...yM.keys()])).map((k) => [
    k,
    Math.max(xM.get(k) || 0, yM.get(k) || 0),
  ]);

const lcm = (cX, cY) =>
  joinWithMax(cX, cY).reduce((acc, [k, v]) => acc * Math.pow(k, v), 1);

// SOLUTION 2
// SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
// Detected time complexity:O(log(N + M))
// CORRECTNESS tests in 0.060s, 0.056s
// PERFORMANCE tests in 0.056, 0.060, 0.064s
function chocolatesByNumbersLCM(n, m) {
  const nF = factorize(n);
  const mF = factorize(m);
  return lcm(nF, mF) / m;
}

module.exports = {
  chocolatesByNumbersBruteForce,
  chocolatesByNumbersLCM
};
