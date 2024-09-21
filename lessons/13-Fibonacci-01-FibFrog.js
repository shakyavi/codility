// The Fibonacci sequence is defined using the following recursive formula:

//     F(0) = 0
//     F(1) = 1
//     F(M) = F(M - 1) + F(M - 2) if M >= 2
// A small frog wants to get to the other side of a river. The frog is initially located at one bank of the river (position −1) and wants to get to the other bank (position N). The frog can jump over any distance F(K), where F(K) is the K-th Fibonacci number. Luckily, there are many leaves on the river, and the frog can jump between the leaves, but only in the direction of the bank at position N.

// The leaves on the river are represented in an array A consisting of N integers. Consecutive elements of array A represent consecutive positions from 0 to N − 1 on the river. Array A contains only 0s and/or 1s:

// 0 represents a position without a leaf;
// 1 represents a position containing a leaf.
// The goal is to count the minimum number of jumps in which the frog can get to the other side of the river (from position −1 to position N). The frog can jump between positions −1 and N (the banks of the river) and every position containing a leaf.

// For example, consider array A such that:

//     A[0] = 0
//     A[1] = 0
//     A[2] = 0
//     A[3] = 1
//     A[4] = 1
//     A[5] = 0
//     A[6] = 1
//     A[7] = 0
//     A[8] = 0
//     A[9] = 0
//     A[10] = 0
// The frog can make three jumps of length F(5) = 5, F(3) = 2 and F(5) = 5.

// Write a function:

// function solution(A);

// that, given an array A consisting of N integers, returns the minimum number of jumps by which the frog can get to the other side of the river. If the frog cannot reach the other side of the river, the function should return −1.

// For example, given:

//     A[0] = 0
//     A[1] = 0
//     A[2] = 0
//     A[3] = 1
//     A[4] = 1
//     A[5] = 0
//     A[6] = 1
//     A[7] = 0
//     A[8] = 0
//     A[9] = 0
//     A[10] = 0
// the function should return 3, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..100,000];
// each element of array A is an integer that can have one of the following values: 0, 1.

const fibList = (n) => {
  const rs = [];

  let twoBack = 0;
  let oneBack = 1;

  let current = oneBack + twoBack;

  while (current <= n) {
    rs.push(current);

    current = oneBack + twoBack;

    twoBack = oneBack;
    oneBack = current;
  }

  return new Set(rs);
};

// SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
// Detected time complexity:O(N * log(N))
// CORRECTNESS tests in 0.052s, 0.056s, 0.060s
// PERFORMANCE tests in 0.060s, 0.068s, 0.076s, 0.080s, 0.084s, 0.092s
function fibFrog(xs) {
  const n = xs.length;

  if (n <= 2) {
    return 1;
  }

  const fs = fibList(n + 1);

  const dp = new Array(n).fill(Infinity);

  dp[n] = 0;

  for (let i = n - 1; i >= -1; i--) {
    if (i === -1 || xs[i] === 1) {
      let min = Infinity;

      for (const f of fs) {
        const eI = i + f;

        if (eI > n) {
          break;
        }

        const prev = dp[eI];
        if (prev < min) {
          min = prev;
        }
      }

      dp[i] = min + 1;
    }
  }

  const res = dp[-1];

  return res === Infinity ? -1 : res;
}

// SCORE 75% (CORRECTNESS 100%; PERFORMANCE 50%;)
// Detected time complexity:O(N * log(N) ** N)
// CORRECTNESS tests in 0.052s, 0.056s
// failed [RUNTIME ERROR: maximum call stack size exceeded] large_cyclic, large_random, extreme_large_ones_zeros (3/6) PERFORMANCE tests in 0.080s, 0.084s, 0.096s
function fibFrogR(xs) {
  const n = xs.length;
  const m = new Map();

  if (n <= 2) {
    return 1;
  }

  const fs = fibList(n + 1);

  const dp = (i) => {
    if (m.has(i)) {
      return m.get(i);
    }

    if (i === n) {
      return 0;
    }

    if (i > n) {
      return Infinity;
    }

    if (xs[i] === 0) {
      return Infinity;
    }

    const opts = [];

    for (const f of fs) {
      const eI = i + f;
      opts.push(dp(eI));
    }

    const res = Math.min(...opts, Infinity) + 1;

    m.set(i, res);

    return res;
  };

  const res = dp(-1);

  return res === Infinity ? -1 : res;
}

module.exports = { fibFrog, fibFrogR };
