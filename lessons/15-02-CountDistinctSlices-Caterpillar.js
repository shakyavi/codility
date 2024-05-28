// An integer M and a non-empty array A consisting of N non-negative integers are given. All integers in array A are less than or equal to M.

// A pair of integers (P, Q), such that 0 ≤ P ≤ Q < N, is called a slice of array A. The slice consists of the elements A[P], A[P + 1], ..., A[Q]. A distinct slice is a slice consisting of only unique numbers. That is, no individual number occurs more than once in the slice.

// For example, consider integer M = 6 and array A such that:

//     A[0] = 3
//     A[1] = 4
//     A[2] = 5
//     A[3] = 5
//     A[4] = 2
// There are exactly nine distinct slices: (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2), (3, 3), (3, 4) and (4, 4).

// The goal is to calculate the number of distinct slices.

// Write a function:

// function solution(M, A);

// that, given an integer M and a non-empty array A consisting of N integers, returns the number of distinct slices.

// If the number of distinct slices is greater than 1,000,000,000, the function should return 1,000,000,000.

// For example, given integer M = 6 and array A such that:

//     A[0] = 3
//     A[1] = 4
//     A[2] = 5
//     A[3] = 5
//     A[4] = 2
// the function should return 9, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// M is an integer within the range [0..100,000];
// each element of array A is an integer within the range [0..M].


// SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
// Detected time complexity:O(N)
// CORRECTNESS tests in 0.052s, 0.056s
// PERFORMANCE tests in 0.052, 0.088s, 0.100s, 0.116s,
function countDistinctSlices(M, A) {
    let sum = 0;
    let front = 0;
    let back = 0;
    let set = new Set();
    while (front < A.length) {
        while (front < A.length && !set.has(A[front])){
            sum += (front-back+1);
            set.add(A[front]);
            front += 1;
        }
        while (A[back] != A[front]) {
            set.delete(A[back]);
            back += 1;
        }
        set.delete(A[back]);
        back += 1;
    }           
    return Math.min(sum, 1000000000);
}

module.exports = countDistinctSlices