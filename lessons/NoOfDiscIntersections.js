
// We draw N discs on a plane. The discs are numbered from 0 to N − 1. An array A of N non-negative integers, specifying the radiuses of the discs, is given. The J-th disc is drawn with its center at (J, 0) and radius A[J].

// We say that the J-th disc and K-th disc intersect if J ≠ K and the J-th and K-th discs have at least one common point (assuming that the discs contain their borders).

// The figure below shows discs drawn for N = 6 and A as follows:

//   A[0] = 1
//   A[1] = 5
//   A[2] = 2
//   A[3] = 1
//   A[4] = 4
//   A[5] = 0


// There are eleven (unordered) pairs of discs that intersect, namely:

// discs 1 and 4 intersect, and both intersect with all the other discs;
// disc 2 also intersects with discs 0 and 3.
// Write a function:

// function solution(A);

// that, given an array A describing N discs as explained above, returns the number of (unordered) pairs of intersecting discs. The function should return −1 if the number of intersecting pairs exceeds 10,000,000.

// Given array A shown above, the function should return 11, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..100,000];
// each element of array A is an integer within the range [0..2,147,483,647].
const byStartAndEnd = ([xStart, xEnd], [yStart, yEnd]) => {
    const diffStart = xStart - yStart
    if (diffStart === 0) {
      return xEnd - yEnd
    }
    return diffStart
  }
  
  // copied from https://github.com/python/cpython/blob/3.8/Lib/bisect.py
  const bisectRight = (a, x, lo = 0, hi = a.length) => {
    if (lo < 0) throw new ValueError('lo must be non-negative')
  
    while (lo < hi) {
      const mid = ((lo + hi) / 2) | 0
  
      if (x < a[mid]) hi = mid
      else lo = mid + 1
    }
  
    return lo
  }
  
  // based off answer on this thread: https://stackoverflow.com/questions/4801242/algorithm-to-calculate-number-of-intersecting-discs/27549852

  //SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
//Detected time complexity O(N * log(N)) or O(N)
  function discIntersections(xs){
    let pairs = 0
    const intervals = xs.map((x, i) => [i - xs[i], i + xs[i]]).sort(byStartAndEnd)
    const starts = intervals.map(([x]) => x)
    for (let i = 0; i < starts.length; i++) {
      const [start, end] = intervals[i]
      // 1. disks started before disk i ends
      // 2. substract all disks that started before this index
      // 3. substract the current disk from counter
      // notes: 1 and 2 makes sure we only count overlaps on the left side
      // started before the current disc but center is at i + n, where n >= 0
      const count = bisectRight(starts, end) - i - 1
      pairs += count
      if (pairs > 10000000) {
        return -1
      }
    }
  
    return pairs
  }

  module.exports = discIntersections;