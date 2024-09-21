// You are given two non-empty arrays A and B consisting of N integers. These arrays represent N planks. More precisely, A[K] is the start and B[K] the end of the K−th plank.

// Next, you are given a non-empty array C consisting of M integers. This array represents M nails. More precisely, C[I] is the position where you can hammer in the I−th nail.

// We say that a plank (A[K], B[K]) is nailed if there exists a nail C[I] such that A[K] ≤ C[I] ≤ B[K].

// The goal is to find the minimum number of nails that must be used until all the planks are nailed. In other words, you should find a value J such that all planks will be nailed after using only the first J nails. More precisely, for every plank (A[K], B[K]) such that 0 ≤ K < N, there should exist a nail C[I] such that I < J and A[K] ≤ C[I] ≤ B[K].

// For example, given arrays A, B such that:

//     A[0] = 1    B[0] = 4
//     A[1] = 4    B[1] = 5
//     A[2] = 5    B[2] = 9
//     A[3] = 8    B[3] = 10
// four planks are represented: [1, 4], [4, 5], [5, 9] and [8, 10].

// Given array C such that:

//     C[0] = 4
//     C[1] = 6
//     C[2] = 7
//     C[3] = 10
//     C[4] = 2
// if we use the following nails:

// 0, then planks [1, 4] and [4, 5] will both be nailed.
// 0, 1, then planks [1, 4], [4, 5] and [5, 9] will be nailed.
// 0, 1, 2, then planks [1, 4], [4, 5] and [5, 9] will be nailed.
// 0, 1, 2, 3, then all the planks will be nailed.
// Thus, four is the minimum number of nails that, used sequentially, allow all the planks to be nailed.

// Write a function:

// function solution(A, B, C);

// that, given two non-empty arrays A and B consisting of N integers and a non-empty array C consisting of M integers, returns the minimum number of nails that, used sequentially, allow all the planks to be nailed.

// If it is not possible to nail all the planks, the function should return −1.

// For example, given arrays A, B, C such that:

//     A[0] = 1    B[0] = 4
//     A[1] = 4    B[1] = 5
//     A[2] = 5    B[2] = 9
//     A[3] = 8    B[3] = 10

//     C[0] = 4
//     C[1] = 6
//     C[2] = 7
//     C[3] = 10
//     C[4] = 2
// the function should return 4, as explained above.

// Write an efficient algorithm for the following assumptions:

// N and M are integers within the range [1..30,000];
// each element of arrays A, B and C is an integer within the range [1..2*M];
// A[K] ≤ B[K].


// SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
// Detected time complexity:O((N + M) * log(M))
// CORRECTNESS tests in 0.052s, 0.056s, 0.060s
// PERFORMANCE tests in 0.108s, 0.140s, 0.148s, 0.136s, 0.236s
function nailingPlanksBS(as, bs, cs) {
    const len = as.length
  
    const valid = (v) => {
      const ns = cs.slice(0, v).sort((x, y) => x - y)
      for (let i = 0; i < len; i++) {
        if (!findNailFor(as[i], bs[i], ns)) {
          return false
        }
      }
      return true
    }
  
    const findNailFor = (s, e, ns) => {
      let lower = 0
      let upper = ns.length - 1
  
      while (lower <= upper) {
        const mid = Math.floor((lower + upper) / 2)
        const midV = ns[mid]
  
        if (midV >= s && midV <= e) {
          return true
        }
  
        if (midV > e) {
          upper = mid - 1
        } else {
          lower = mid + 1
        }
      }
  
      return false
    }
  
    const binSearch = (s, e, p) => {
      let lower = s
      let upper = e
  
      while (lower <= upper) {
        const mid = Math.floor((lower + upper) / 2)
        if (p(mid)) {
          upper = mid - 1
        } else {
          lower = mid + 1
        }
      }
  
      return lower
    }
  
    const res = binSearch(1, cs.length, x => valid(x))
  
    return res > len ? -1 : res
  }

  module.exports = nailingPlanksBS