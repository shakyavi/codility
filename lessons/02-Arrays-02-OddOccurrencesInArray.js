/**
 * A non-empty array A consisting of N integers is given. The array contains an
 * odd number of elements, and each element of the array can be paired with
 * another element that has the same value, except for one element that is left
 * unpaired.
 *
 * For example, in array A such that:
 *
 * A[0] = 9  A[1] = 3  A[2] = 9 A[3] = 3  A[4] = 9  A[5] = 7 A[6] = 9 the
 * elements at indexes 0 and 2 have value 9, the elements at indexes 1 and 3
 * have value 3, the elements at indexes 4 and 6 have value 9, the element at
 * index 5 has value 7 and is unpaired. Write a function:
 *
 * function solution(A);
 *
 * that, given an array A consisting of N integers fulfilling the above
 * conditions, returns the value of the unpaired element.
 *
 * For example, given array A such that:
 *
 * A[0] = 9  A[1] = 3  A[2] = 9 A[3] = 3  A[4] = 9  A[5] = 7 A[6] = 9 the
 * function should return 7, as explained in the example above.
 *
 * Write an efficient algorithm for the following assumptions:
 *
 * N is an odd integer within the range [1..1,000,000]; each element of array A
 * is an integer within the range [1..1,000,000,000]; all but one of the values
 * in A occur an even number of times.
 */

//SWAP with ConsecutiveElementsDifferences

//66%
function myOddOccurenceSolution(A) {
  // Implement your solution here
  const B = [...new Set(A)];
  const result = [];
  B.map( (key) => {
      const count = A.filter( (val) => val===key ).length;
      result.push({key,count});        
  } )
  const oddVal = result.find( (obj) => obj.count%2!==0)
  return oddVal.key
}

//66%
function myOddOccurenceStack(A) {
  // Implement your solution here
  const stack = [];
  for (let idx = 0; idx < A.length; idx++) {
    const elementIndex = stack.indexOf(A[idx]);
    if (elementIndex == -1) stack.push(A[idx]);
    else stack.splice(elementIndex, 1);
  }
  return stack?.length > 0 ? stack[0] : -1;
}
//100%
function oddOccurenceSolution(A) {
  let stack = {}
  for (let i = 0; i < A.length; i++) {
    if (typeof stack[A[i]] === 'undefined') {
      stack[A[i]] = true
    } else {
      delete stack[A[i]]
    }
  }

  return +Object.keys(stack)[0]
}

module.exports = oddOccurenceSolution
