/* A non-empty array A consisting of N integers is given. The product of triplet (P, Q, R) equates to A[P] * A[Q] * A[R] (0 ≤ P < Q < R < N).

For example, array A such that:

  A[0] = -3
  A[1] = 1
  A[2] = 2
  A[3] = -2
  A[4] = 5
  A[5] = 6
contains the following example triplets:

(0, 1, 2), product is −3 * 1 * 2 = −6
(1, 2, 4), product is 1 * 2 * 5 = 10
(2, 4, 5), product is 2 * 5 * 6 = 60
Your goal is to find the maximal product of any triplet.

Write a function:

function solution(A);

that, given a non-empty array A, returns the value of the maximal product of any triplet.

For example, given array A such that:

  A[0] = -3
  A[1] = 1
  A[2] = 2
  A[3] = -2
  A[4] = 5
  A[5] = 6
the function should return 60, as the product of triplet (2, 4, 5) is maximal.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [3..100,000];
each element of array A is an integer within the range [−1,000..1,000].
 */


//SCORE 44% (CORRECTNESS 50%; PERFORMANCE 40%;)
//Detected time complexity O(B-A)
//failed simple1, simple2 (2/4) correctness tests
//failed medium_range, large_range, extreme_large (3/5) performance tests
function solution(A) {
    // Implement your solution here
    A.sort((a,b)=>b-a)
    return A[0]*A[1]*A[2]
}

//SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
//Detected time complexity O(N * log(N))
//extreme_large (0.084s,0.092s), large_range (0.084s), large_random(0.120), medium_random(0.068s), medium_range(0.056s)
function myMaxProductOfThree(A) {
    if(A.length===3)
        return A[0]*A[1]*A[2];
    A.sort((a,b)=>b-a);
    const Pos1 = A[0];
    let max = Pos1*A[1]*A[2];
    const lastThree = A.splice(-3);
    const negatives = lastThree.filter((a)=>a<0);
    let negProd = max;
    if(negatives.length>=2){
        negProd = negatives[negatives.length-1]*negatives[negatives.length-2]*Pos1;
        max = Math.max(max,negProd)
    }
    return max;
}


//SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
//Detected time complexity O(N * log(N))
//extreme_large (0.088s,0.096s), large_range (0.084s), large_random(0.100s), medium_random(0.068s), medium_range(0.056s)
function solution(xs) {
    const maxOneIdx = findMax(xs, new Set([]))
    const maxTwoIdx = findMax(xs, new Set([maxOneIdx]))
    const maxThreeIdx = findMax(xs, new Set([maxOneIdx, maxTwoIdx]))
  
    const minOneIdx = findMin(xs, new Set([maxOneIdx]))
    const minTwoIdx = findMin(xs, new Set([maxOneIdx, minOneIdx]))
  
    const opts = [
      [maxOneIdx, maxTwoIdx, maxThreeIdx],
      [maxOneIdx, minOneIdx, minTwoIdx],
    ].map(ys =>
      ys.map(x => xs[x]).reduce((x, y) => x * y, 1)
    )
  
    return Math.max(...opts)
  }
  
  const findMax = (xs, exceptIdxs) => {
    let maxVal = -Infinity
    let maxIdx = 0
  
    for (let i = 0; i < xs.length; i++) {
      const cur = xs[i]
      if (!exceptIdxs.has(i) && cur > maxVal) {
        maxVal = cur
        maxIdx = i
      }
    }
    return maxIdx
  }
  
  const findMin = (xs, exceptIdxs) => {
    let maxVal = Infinity
    let maxIdx = 0
  
    for (let i = 0; i < xs.length; i++) {
      const cur = xs[i]
      if (!exceptIdxs.has(i) && cur < maxVal) {
        maxVal = cur
        maxIdx = i
      }
    }
    return maxIdx
  }