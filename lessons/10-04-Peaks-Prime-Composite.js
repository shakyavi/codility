// A non-empty array A consisting of N integers is given.

// A peak is an array element which is larger than its neighbors. More precisely, it is an index P such that 0 < P < N − 1,  A[P − 1] < A[P] and A[P] > A[P + 1].

// For example, the following array A:

//     A[0] = 1
//     A[1] = 2
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
// has exactly three peaks: 3, 5, 10.

// We want to divide this array into blocks containing the same number of elements. More precisely, we want to choose a number K that will yield the following blocks:

// A[0], A[1], ..., A[K − 1],
// A[K], A[K + 1], ..., A[2K − 1],
// ...
// A[N − K], A[N − K + 1], ..., A[N − 1].
// What's more, every block should contain at least one peak. Notice that extreme elements of the blocks (for example A[K − 1] or A[K]) can also be peaks, but only if they have both neighbors (including one in an adjacent blocks).

// The goal is to find the maximum number of blocks into which the array A can be divided.

// Array A can be divided into blocks as follows:

// one block (1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2). This block contains three peaks.
// two blocks (1, 2, 3, 4, 3, 4) and (1, 2, 3, 4, 6, 2). Every block has a peak.
// three blocks (1, 2, 3, 4), (3, 4, 1, 2), (3, 4, 6, 2). Every block has a peak. Notice in particular that the first block (1, 2, 3, 4) has a peak at A[3], because A[2] < A[3] > A[4], even though A[4] is in the adjacent block.
// However, array A cannot be divided into four blocks, (1, 2, 3), (4, 3, 4), (1, 2, 3) and (4, 6, 2), because the (1, 2, 3) blocks do not contain a peak. Notice in particular that the (4, 3, 4) block contains two peaks: A[3] and A[5].

// The maximum number of blocks that array A can be divided into is three.

// Write a function:

// function solution(A);

// that, given a non-empty array A consisting of N integers, returns the maximum number of blocks into which A can be divided.

// If A cannot be divided into some number of blocks, the function should return 0.

// For example, given:

//     A[0] = 1
//     A[1] = 2
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

// N is an integer within the range [1..100,000];
// each element of array A is an integer within the range [0..1,000,000,000].

// SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
// Detected time complexity:O(N * log(log(N)))
// CORRECTNESS tests in 0.052s, 0.056s
// PERFORMANCE tests in 0.056, 0.080s, 0.092s, 0.076s

function peak(xs) {
    const isPeak = (i, xs) =>
      i > 0 && i < xs.length - 1 && xs[i] > xs[i - 1] && xs[i] > xs[i + 1]
  
    const getPeaks = xs => {
      const ps = new Array(xs.length).fill(0)
      let peaksSoFar = 0
      for (let i = 0; i < xs.length; i++) {
        if (isPeak(i, xs)) {
          peaksSoFar++
        }
        ps[i] = peaksSoFar
      }
      return ps
    }
  
    const peaks = getPeaks(xs)
    const peakCount = peaks[peaks.length - 1]
  
    if (peakCount < 2) {
      return peakCount
    }
  
    const multipliersFor = x => {
      const root = Math.ceil(Math.sqrt(x))
      const ms = new Set([1, x])
  
      for (let i = 2; i <= root; i++) {
        if (x % i === 0) {
          ms.add(i)
          ms.add(x / i)
        }
      }
  
      return Array.from(ms).sort((x, y) => x - y)
    }
  
    const ms = multipliersFor(xs.length)
      .filter(
      x => x >= Math.ceil(xs.length / peakCount)
    )
  
    const canSplit = k => {
      for (let i = 0; i < xs.length; i += k) {
        const j = i + k - 1
        const diff = peaks[j] - (peaks[i - 1] || 0)
        if (diff < 1) {
          return false
        }
      }
  
      return true
    }
  
    const bs = (sI, eI) => {
      const mI = Math.floor((sI + eI) / 2)
      const mV = ms[mI]
      const sV = ms[sI]
  
      if (canSplit(sV)) {
        return sV
      }
  
      if (sI + 1 === eI) {
        return ms[eI]
      }
  
      if (canSplit(mV)) {
        return bs(sI, mI)
      }
  
      return bs(mI + 1, eI)
    }
  
    const smallestK = bs(0, ms.length - 1)
  
    return xs.length / smallestK
  }

  module.exports = peak