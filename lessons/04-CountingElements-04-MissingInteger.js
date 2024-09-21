/**
 * This is a demo task.
 *
 * Write a function:
 *
 * function solution(A);
 *
 * that, given an array A of N integers, returns the smallest positive integer
 * (greater than 0) that does not occur in A.
 *
 * For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.
 *
 * Given A = [1, 2, 3], the function should return 4.
 *
 * Given A = [−1, −3], the function should return 1.
 *
 * Write an efficient algorithm for the following assumptions:
 *
 * N is an integer within the range [1..100,000]; each element of array A is an
 * integer within the range [−1,000,000..1,000,000].
 */

//ATTEMPT 2 May 26 sunday morning
//SCORE 33% (CORRECTNESS 60%; PERFORMANCE 0%;)
//Failed extreme_min_max_value correctness test
//Failed positive_only correctness test
//failed medium, large_1, large_2, large_3 (all) performance tests

//ATTEMPT 3 May 26 sunday morning
//CORRECTED .filter and .sort
//SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
function myMissingInteger(A) {
  // Implement your solution here
  if(!A?.length)
      return 1    
  console.log('input',A)
  const dist = [...new Set(A)].filter((o)=>o>0);
  //INCORRECT USE OF FILTER
  // dist.filter((o)=>o>0);
  console.log('dist +ve and unique',dist)
  //INCORRECT USE OF SORT
  //by default sort converts input into string before sorting
  // dist.sort();
  dist.sort((a,b)=>a-b)
  if(dist[0]!==1 || dist[dist.length-1]<1)
      return 1
  let small =2;
  for(let i=1; i<dist.length; i++){       
      if(dist[i]<small) return dist[i]
      else if(small<dist[i]) return small;
      else small++;
  }
  return small;
}

function missingInteger(A) {
  const sorted = A.sort((a, b) => a - b)

  let current = 0
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] - current > 1) {
      return current + 1
    }
    if (sorted[i] > 0) {
      current = sorted[i]
    }
  }

  return current < 0 ? 1 : current + 1
}

module.exports = myMissingInteger
