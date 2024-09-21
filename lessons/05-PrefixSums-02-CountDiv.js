
// Write a function:
// function solution(A, B, K);
// that, given three integers A, B and K, returns the number of integers within the range [A..B] that are divisible by K, i.e.:
// { i : A ≤ i ≤ B, i mod K = 0 }
// For example, for A = 6, B = 11 and K = 2, your function should return 3, because there are three numbers divisible by 2 within the range [6..11], namely 6, 8 and 10.
// Write an efficient algorithm for the following assumptions:
// A and B are integers within the range [0..2,000,000,000];
// K is an integer within the range [1..2,000,000,000];
// A ≤ B.

//SCORE 50% (CORRECTNESS 100%; PERFORMANCE 0%;)
//Detected time complexity O(B-A)
//failed big_values, big_values2, big_values3, big_values4 (all) performance tests
function myCountDiv(A, B, K) {
    // Implement your solution here
    let ctr = 0;
    for(let i=A;i<=B;i++){
        ctr = i%K===0 ? ctr+1: ctr;
    }
    return ctr
}

//SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
//Detected time complexity O(1)
//recommended swap with OneTwoSum.
function myCountDivPass(A, B, K) {
    // Implement your solution here
    let b = parseInt( B/K);
    let a = parseInt( (A > 0 ? (A - 1)/K: 0));
    if(A == 0){
        b++;
    }
    return b - a;
}

module.exports = myCountDiv