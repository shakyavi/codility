// For a given array A of N integers and a sequence S of N integers from the set {−1, 1}, we define val(A, S) as follows:

// val(A, S) = |sum{ A[i]*S[i] for i = 0..N−1 }|

// (Assume that the sum of zero elements equals zero.)

// For a given array A, we are looking for such a sequence S that minimizes val(A,S).

// Write a function:

// function solution(A);

// that, given an array A of N integers, computes the minimum value of val(A,S) from all possible values of val(A,S) for all possible sequences S of N integers from the set {−1, 1}.

// For example, given array:

//   A[0] =  1
//   A[1] =  5
//   A[2] =  2
//   A[3] = -2
// your function should return 0, since for S = [−1, 1, −1, 1], val(A, S) = 0, which is the minimum possible value.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..20,000];
// each element of array A is an integer within the range [−100..100].

// SOLUTION 1 : BruteForce
// SCORE 36% (CORRECTNESS 66%; PERFORMANCE 0%;)
// failed (2/4) range, functional CORRECTNESS tests in 0.052s, 0.056s
// failed (5/5) all PERFORMANCE tests [TIMEOUT ERROR: Killed. Hard limit reached: 6.000sec]
function minAbsSumBF(xs) {
    const len = xs.length
  
    const dfs = (i) => {
      if (i < 0) {
        return [0]
      }
  
      const res = dfs(i - 1).flatMap(x => [x + xs[i], x - xs[i]])
      return res
    }
    return Math.min(...dfs(len - 1).map(x => Math.abs(x)))
  }


// SOLUTION 2 
// SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
// Detected time complexity:O(N * max(abs(A))**2)
// CORRECTNESS tests in 0.052s, 0.056s, 0.060s
// PERFORMANCE tests in 0.056s, 0.064s, 0.072s, 0.076s, 0.0104s
  function minAbsSumDP(ns) {
    const xs = ns.map(x => Math.abs(x))
    const len = xs.length
    const max = Math.max(...xs, 0)
    const sum = xs.reduce((x, y) => x + y, 0)
  
    const cs = new Array(max + 1).fill(0)
    for (const x of xs) {
      cs[x] = cs[x] + 1
    }
  
    const dp = new Array(sum + 1).fill(-1)
    dp[0] = 0
    for  (let i = 1; i <= max; i++) {
      if (cs[i] > 0) {
        for (let j = 0; j < sum; j++) {
          if (dp[j] >= 0) {
            dp[j] = cs[i]
          } else if (j >= i && dp[j - i] > 0) {
            dp[j] = dp[j - i] - 1
          }
        }
      }
    }
  
    let res = sum
    for (let i = 0; i < Math.floor(sum / 2) + 1; i++) {
      if (dp[i] >= 0) {
        res = Math.min(res, sum - 2 * i)
      }
    }
  
    return res
  }
  module.exports = {
    minAbsSumBF,
    minAbsSumDP
  }