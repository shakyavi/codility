// You are given integers K, M and a non-empty array A consisting of N integers. Every element of the array is not greater than M.

// You should divide this array into K blocks of consecutive elements. The size of the block is any integer between 0 and N. Every element of the array should belong to some block.

// The sum of the block from X to Y equals A[X] + A[X + 1] + ... + A[Y]. The sum of empty block equals 0.

// The large sum is the maximal sum of any block.

// For example, you are given integers K = 3, M = 5 and array A such that:

//   A[0] = 2
//   A[1] = 1
//   A[2] = 5
//   A[3] = 1
//   A[4] = 2
//   A[5] = 2
//   A[6] = 2
// The array can be divided, for example, into the following blocks:

// [2, 1, 5, 1, 2, 2, 2], [], [] with a large sum of 15;
// [2], [1, 5, 1, 2], [2, 2] with a large sum of 9;
// [2, 1, 5], [], [1, 2, 2, 2] with a large sum of 8;
// [2, 1], [5, 1], [2, 2, 2] with a large sum of 6.
// The goal is to minimize the large sum. In the above example, 6 is the minimal large sum.

// Write a function:

// function solution(K, M, A);

// that, given integers K, M and a non-empty array A consisting of N integers, returns the minimal large sum.

// For example, given K = 3, M = 5 and array A such that:

//   A[0] = 2
//   A[1] = 1
//   A[2] = 5
//   A[3] = 1
//   A[4] = 2
//   A[5] = 2
//   A[6] = 2
// the function should return 6, as explained above.

// Write an efficient algorithm for the following assumptions:

// N and K are integers within the range [1..100,000];
// M is an integer within the range [0..10,000];
// each element of array A is an integer within the range [0..M].

// SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
// Detected time complexity:O(N*log(N+M))
// CORRECTNESS tests in 0.052s, 0.056s
// PERFORMANCE tests in 0.052s, 0.056s, 0.068s, 0.076s, 0.084s, 0.084s, 0.092s, 0.152s, 0.156s, 0.164s
function minMaxDivision(k, m, xs) {
    const max = Math.max(...xs)
    const sum = xs.reduce((x, y) => x + y)
  
    if (k === 1) {
      return sum
    }
  
    if (k >= xs.length) {
      return max
    }
  
    const valid = (v) => {
      let sum = 0
      let count = 0
  
      for (const x of xs) {
        if (sum + x > v) {
          sum = x
          count += 1
        } else {
          sum += x
        }
  
        if (count >= k) {
          return false
        }
      }
  
      return true
    }
  
    let lower = max
    let upper = sum
  
    const bs = () => {
      while (lower <= upper) {
        mid = Math.floor((lower + upper) / 2)
        if (valid(mid)) {
          upper = mid - 1
        } else {
          lower = mid + 1
        }
      }
  
      return lower
    }
  
    return bs()
  }

module.exports = minMaxDivision