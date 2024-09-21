// A positive integer D is a factor of a positive integer N if there exists an integer M such that N = D * M.
// For example, 6 is a factor of 24, because M = 4 satisfies the above condition (24 = 6 * 4).
// Write a function:
// function solution(N);
// that, given a positive integer N, returns the number of its factors.
// For example, given N = 24, the function should return 8, because 24 has 8 factors, namely 1, 2, 3, 4, 6, 8, 12, 24. There are no other factors of 24.
// Write an efficient algorithm for the following assumptions:
// N is an integer within the range [1..2,147,483,647]

//SCORE 71% (CORRECTNESS 75%; PERFORMANCE 66%;)
//failed tiny, extreme_one (2/8) CORRECTNESS tests
//failed big3, extreme_maxint (2/6) PERFORMANCE tests; passed others in 0.056s

//SECOND TRY
//SCORE 85% (CORRECTNESS 100%; PERFORMANCE 66%;)
//Detected time complexity O(sqrt(N)) or O(N)
//failed big3, extreme_maxint (2/6) PERFORMANCE tests; passed others in 0.056s
function myCountFactors(N) {
    // First try
    /* if(N===1)
        return 0;
    else if(N<=2)
        return 1; */

    //Second try
    //corrected the edge case logic
    if(N===1)
        return 1;
    else if(N===2)
        return 2;

    const factors = {};
  let divisor = 2;

  while (N >= 2) {
    if (N % divisor == 0) {
      if(factors[divisor]===undefined)
        factors[divisor] = 1;
      else
        factors[divisor] = factors[divisor]+1;
      N = N / divisor;
    } else {
      divisor++;
    }
  }
  const pFArr  =Object.values(factors);
  return pFArr.reduce((a, b) => {return a * (b+1)}, 1)
}

//SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
// Detected time complexity:O(sqrt(N))
// CORRECTNESS tests in 0.052s, 0.056s
// PERFORMANCE tests in 0.052s, 0.056s
function countFactors(x) {
    let factors = 0
    let root = Math.floor(Math.sqrt(x))
  
    if (Math.pow(root, 2) === x) {
      factors++
    } else {
      root++
    }
  
    for (let i = 1; i < root; i++) {
      if (x % i === 0) {
        factors += 2
      }
    }
  
    return factors
  }
  


module.exports = countFactors;