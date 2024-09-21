// A non-empty array A consisting of N integers is given.

// The leader of this array is the value that occurs in more than half of the elements of A.

// An equi leader is an index S such that 0 ≤ S < N − 1 and two sequences A[0], A[1], ..., A[S] and A[S + 1], A[S + 2], ..., A[N − 1] have leaders of the same value.

// For example, given array A such that:

//     A[0] = 4
//     A[1] = 3
//     A[2] = 4
//     A[3] = 4
//     A[4] = 4
//     A[5] = 2
// we can find two equi leaders:

// 0, because sequences: (4) and (3, 4, 4, 4, 2) have the same leader, whose value is 4.
// 2, because sequences: (4, 3, 4) and (4, 4, 2) have the same leader, whose value is 4.
// The goal is to count the number of equi leaders.

// Write a function:

// function solution(A);

// that, given a non-empty array A consisting of N integers, returns the number of equi leaders.

// For example, given:

//     A[0] = 4
//     A[1] = 3
//     A[2] = 4
//     A[3] = 4
//     A[4] = 4
//     A[5] = 2
// the function should return 2, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array A is an integer within the range [−1,000,000,000..1,000,000,000].


//SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
//O(N)
function equiLeader(xs) {
    const len = xs.length
  
    if (len < 2) {
      return 0
    }
  
    const globalLeader = xs => {
      const m = new Map()
      for (const x of xs) {
        const count = (m.get(x) || 0) + 1
        m.set(x, count)
        if (count > len / 2) {
          return x
        }
      }
  
      return undefined
    }
  
    const l = globalLeader(xs)
    if (l == null) {
      return 0
    }
  
    const ltr = new Array(len).fill(false)
    const rtl = new Array(len).fill(false)
  
    let countLtr = 0
    let countRtl = 0
  
    for (let i = 0; i < len; i++) {
      countLtr += xs[i] === l ? 1 : 0
      const isLocalLeader = countLtr > (i + 1) / 2
      ltr[i] = isLocalLeader
    }
  
    for (let i = len - 1; i >= 0; i--) {
      countRtl += xs[i] === l ? 1 : 0
      const isLocalLeader = countRtl > (len - i) / 2
      rtl[i] = isLocalLeader
    }
  
    return ltr.filter((x, idx) => x === true && rtl[idx + 1] === true).length
  }

  module.exports = equiLeader;