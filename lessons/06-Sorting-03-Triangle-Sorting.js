// An array A consisting of N integers is given. A triplet (P, Q, R) is triangular if 0 ≤ P < Q < R < N and:

// A[P] + A[Q] > A[R],
// A[Q] + A[R] > A[P],
// A[R] + A[P] > A[Q].
// For example, consider array A such that:

//   A[0] = 10    A[1] = 2    A[2] = 5
//   A[3] = 1     A[4] = 8    A[5] = 20
// Triplet (0, 2, 4) is triangular.

// Write a function:

// function solution(A);

// that, given an array A consisting of N integers, returns 1 if there exists a triangular triplet for this array and returns 0 otherwise.

// For example, given array A such that:

//   A[0] = 10    A[1] = 2    A[2] = 5
//   A[3] = 1     A[4] = 8    A[5] = 20
// the function should return 1, as explained above. Given array A such that:

//   A[0] = 10    A[1] = 50    A[2] = 5
//   A[3] = 1
// the function should return 0.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..100,000];
// each element of array A is an integer within the range [−2,147,483,648..2,147,483,647].

//SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
//Detected time complexity O(N * log(N))
//large1 (0.072s,0.056s, 0.056s, 0.052s, 0.056s, 0.056s),
// large2
// (1.0.084 sOK
// 2.0.052 sOK
// 3.0.056 sOK
// 4.0.056 sOK
// 5.0.056 sOK
// 6.0.056 sOK),
function triangle(xs) {
    console.log(xs.length)
  if (xs.length < 3) {
    return 0;
  }

  const sorted = xs.filter((x) => x > 0).sort((x, y) => x - y);
  for (let i = 0; i < sorted.length - 2; i++) {
    const a = sorted[i];
    const b = sorted[i + 1];
    const c = sorted[i + 2];
    console.log(`${a},${b},${c}`)
    if (a + b > c && b + c > a && c + a > b) {
      return 1;
    }
  }

  return 0;
}

module.exports = triangle;
