// A non-empty array A consisting of N numbers is given. The array is sorted in non-decreasing order. The absolute distinct count of this array is the number of distinct absolute values among the elements of the array.

// For example, consider array A such that:

//   A[0] = -5
//   A[1] = -3
//   A[2] = -1
//   A[3] =  0
//   A[4] =  3
//   A[5] =  6
// The absolute distinct count of this array is 5, because there are 5 distinct absolute values among the elements of this array, namely 0, 1, 3, 5 and 6.

// Write a function:

// function solution(A);

// that, given a non-empty array A consisting of N numbers, returns absolute distinct count of array A.

// For example, given array A such that:

//   A[0] = -5
//   A[1] = -3
//   A[2] = -1
//   A[3] =  0
//   A[4] =  3
//   A[5] =  6
// the function should return 5, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array A is an integer within the range [−2,147,483,648..2,147,483,647];
// array A is sorted in non-decreasing order.


// SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
// Detected time complexity:O(N) or O(N*log(N))
// CORRECTNESS tests in 0.052s, 0.056s, 0.060s
// PERFORMANCE tests in 0.084s, 0.096s
function myAbsDistinct(A) {
    if(A?.length===1)
        return 1;
    const absArr = A.map((a)=> Math.abs(a))
    return [...new Set(absArr)].length
}

// SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
// Detected time complexity:O(N) or O(N*log(N))
// CORRECTNESS tests in 0.052s, 0.056s, 0.060s
// PERFORMANCE tests in 0.080s, 0.088s
function absDistinct(xs) {
    let count = 0
  
    if (xs.length <= 1) {
      return xs.length
    }
  
    let sI = 0
    let eI = xs.length - 1
  
    while (sI <= eI) {
      const sV = xs[sI]
      const eV = xs[eI]
  
      if (Math.abs(sV) > Math.abs(eV)) {
        while (xs[sI] === sV) {
          sI++
        }
        count++
      } else if (Math.abs(eV) > Math.abs(sV)) {
        while (xs[eI] === eV) {
          eI--
        }
        count++
      } else {
        while (xs[sI] === sV) {
          sI++
        }
        while (xs[eI] === eV) {
          eI--
        }
        count++
      }
    }
  
    return count
  }
module.exports = {
    absDistinct,
    myAbsDistinct
}