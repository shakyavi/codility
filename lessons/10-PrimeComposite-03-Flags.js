// A non-empty array A consisting of N integers is given.

// A peak is an array element which is larger than its neighbours. More precisely, it is an index P such that 0 < P < N − 1 and A[P − 1] < A[P] > A[P + 1].

// For example, the following array A:

//     A[0] = 1
//     A[1] = 5
//     A[2] = 3
//     A[3] = 4
//     A[4] = 3
//     A[5] = 4
//     A[6] = 1
//     A[7] = 2
//     A[8] = 3
//     A[9] = 4
//     A[10] = 6
//     A[11] = 2
// has exactly four peaks: elements 1, 3, 5 and 10.

// You are going on a trip to a range of mountains whose relative heights are represented by array A, as shown in a figure below. You have to choose how many flags you should take with you. The goal is to set the maximum number of flags on the peaks, according to certain rules.



// Flags can only be set on peaks. What's more, if you take K flags, then the distance between any two flags should be greater than or equal to K. The distance between indices P and Q is the absolute value |P − Q|.

// For example, given the mountain range represented by array A, above, with N = 12, if you take:

// two flags, you can set them on peaks 1 and 5;
// three flags, you can set them on peaks 1, 5 and 10;
// four flags, you can set only three flags, on peaks 1, 5 and 10.
// You can therefore set a maximum of three flags in this case.

// Write a function:

// function solution(A);

// that, given a non-empty array A of N integers, returns the maximum number of flags that can be set on the peaks of the array.

// For example, the following array A:

//     A[0] = 1
//     A[1] = 5
//     A[2] = 3
//     A[3] = 4
//     A[4] = 3
//     A[5] = 4
//     A[6] = 1
//     A[7] = 2
//     A[8] = 3
//     A[9] = 4
//     A[10] = 6
//     A[11] = 2
// the function should return 3, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..400,000];
// each element of array A is an integer within the range [0..1,000,000,000].



// SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
// Detected time complexity:O(N)
// CORRECTNESS tests in 0.052s, 0.056s, 0.068s
// PERFORMANCE tests in 0.136s, 0.116s, 0.260s, 0.288s
function flags(xs) {
    const peaks = xs
      .map((x, i) => [i, x])
      .filter(
        ([i, x]) => i > 0 && i < xs.length - 1 && xs[i - 1] < x && x > xs[i + 1]
      )
      .map(([i]) => i)
  
    const len = peaks.length
  
    if (len < 2) {
      return len
    }
  
    const canPut = (k) => {
      let curIdx = 1
      let prevIdx = 0
  
      let curK = 1 // always flag first peak
  
      while (curIdx < peaks.length) {
        const cur = peaks[curIdx]
        const prev = peaks[prevIdx]
  
        if (cur - prev >= k) {
          curK++
          prevIdx = curIdx
        }
  
        curIdx++
  
        if (curK === k) {
          return true
        }
      }
  
      return curK === k
    }
  
    const bs = (start, end) => {
      const middle = Math.floor((start + end) / 2)
  
      if (canPut(end)) {
        return end
      }
  
      if (start + 1 === end) {
        return start
      }
  
      if (canPut(middle)) {
        return bs(middle, end)
      }
  
      return bs(start, middle - 1)
    }
  
    return bs(2, Math.ceil(Math.sqrt(xs.length)))
  }

  module.exports = flags