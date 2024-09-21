/* An array A consisting of N different integers is given. The array contains integers in the range [1..(N + 1)], which means that exactly one element is missing.

Your goal is to find that missing element.

Write a function:

function solution(A);

that, given an array A, returns the value of the missing element.

For example, given array A such that:

  A[0] = 2
  A[1] = 3
  A[2] = 1
  A[3] = 5
the function should return 4, as it is the missing element.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [0..100,000];
the elements of A are all distinct;
each element of array A is an integer within the range [1..(N + 1)]. 
*/
/* function permMissingElem(A) {
    const sum = A.length * (A.length + 1) / 2 
    const realSum = A.reduce((a, b) => a + b, 0)
    console.log(`sum=${sum}; realSum=${realSum}`)
    return A.length + 1 - (realSum - sum)
} */

//100%
function permMissingElem(A) {
    const sum = (A.length+1) * (A.length + 2) / 2 
    const realSum = A.reduce((a, b) => a + b, 0)
    return sum-realSum;    
}
// NO IDEA WHY RUNTIME ERROR
//GOT 30% after checking empty condtions, other wise only 10%
//misleading instructions
/* function permMissingElem(A) {
    if(!A.length)
        return 1;
    A.sort()
    if(A[0]!==1)
        return 1;
    if(A.length===1)
        return A[0]===1? 2 : 1;
    for(let i=1;i<A.length;i++)
    {
        if(A[i] !== i+1)
            return i+1;
    }
} */

module.exports = permMissingElem
