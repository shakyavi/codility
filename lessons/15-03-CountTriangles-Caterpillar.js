// An array A consisting of N integers is given. A triplet (P, Q, R) is triangular if it is possible to build a triangle with sides of lengths A[P], A[Q] and A[R]. In other words, triplet (P, Q, R) is triangular if 0 ≤ P < Q < R < N and:

// A[P] + A[Q] > A[R],
// A[Q] + A[R] > A[P],
// A[R] + A[P] > A[Q].
// For example, consider array A such that:

//   A[0] = 10    A[1] = 2    A[2] = 5
//   A[3] = 1     A[4] = 8    A[5] = 12
// There are four triangular triplets that can be constructed from elements of this array, namely (0, 2, 4), (0, 2, 5), (0, 4, 5), and (2, 4, 5).

// Write a function:

// function solution(A);

// that, given an array A consisting of N integers, returns the number of triangular triplets in this array.

// For example, given array A such that:

//   A[0] = 10    A[1] = 2    A[2] = 5
//   A[3] = 1     A[4] = 8    A[5] = 12
// the function should return 4, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..1,000];
// each element of array A is an integer within the range [1..1,000,000,000].

// SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
// Detected time complexity:O(N**2)
// CORRECTNESS tests in 0.052s, 0.056s
// PERFORMANCE tests in 0.052, 0.060s
function countTriangles(ns) {
  const xs = [...ns].sort((x, y) => x - y);

  const len = xs.length;
  let count = 0;

  for (let i = 0; i < len; i++) {
    const x = xs[i];
    let k = i + 2;
    for (let j = i + 1; j < len; j++) {
      const y = xs[j];

      while (k < len && x + y > xs[k]) {
        k++;
      }

      count += k - j - 1;
    }
  }

  return count;
}

module.exports = countTriangles;
