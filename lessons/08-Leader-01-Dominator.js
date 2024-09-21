// An array A consisting of N integers is given. The dominator of array A is the value that occurs in more than half of the elements of A.

// For example, consider array A such that

//  A[0] = 3    A[1] = 4    A[2] =  3
//  A[3] = 2    A[4] = 3    A[5] = -1
//  A[6] = 3    A[7] = 3
// The dominator of A is 3 because it occurs in 5 out of 8 elements of A (namely in those with indices 0, 2, 4, 6 and 7) and 5 is more than a half of 8.

// Write a function

// function solution(A);

// that, given an array A consisting of N integers, returns index of any element of array A in which the dominator of A occurs. The function should return −1 if array A does not have a dominator.

// For example, given array A such that

//  A[0] = 3    A[1] = 4    A[2] =  3
//  A[3] = 2    A[4] = 3    A[5] = -1
//  A[6] = 3    A[7] = 3
// the function may return 0, 2, 4, 6 or 7, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..100,000];
// each element of array A is an integer within the range [−2,147,483,648..2,147,483,647].

//SCORE 25% (CORRECTNESS 12%; PERFORMANCE 50%;)
//passed (1/8) correctness tests
//passed (2/4) performance tests
function myDominator(A) {
    const len = A?.length
    if(!len)
        return -1;
    
    let allowedUnique = len-(len/2);
    let half = len/2;
    if(len%2!==0){
        half = Math.ceil(len/2);
        allowedUnique = len-half+1;
    }
    const uniq = [...new Set(A)];
    if(uniq.length>allowedUnique)
        return -1;
    const countMap = []
    for(let i=0;i<A.length;i++){
        if(countMap[A[i]] === undefined)
            countMap[A[i]] = [i];
        else
            countMap[A[i]].push(i)
    }
    let result = -1;
    for (const [key, value] of Object.entries(countMap)) {
          if(value.length>half){
              result = value;
              break;            
          }            
    }
    return result[0]
}


//SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
//O(N*log(N)) or O(N)
function dominator(xs) {
    const halfLength = Math.floor(xs.length / 2)
    const m = new Map()
  
    for (let i = 0; i < xs.length; i++) {
      const x = xs[i]
      const count = (m.has(x) ? m.get(x) : 0) + 1
      if (count > halfLength) {
        return i
      }
      m.set(x, count)
    }
  
    return -1
  }

  module.exports = dominator;
