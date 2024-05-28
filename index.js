let solution = 'solution'

// const cyclicRotation = require("./lessons/CyclicRotation")
// solution = cyclicRotation([1,2,3,4,5,6],2);

// const frogRiverOne = require("./lessons/FrogRiverOne")
// solution = frogRiverOne(5,[1,5,4,2,6,3])

// const permMissingElem = require("./lessons/PermMissingElem");
// solution = permMissingElem([3,2])

// const myMissingInteger = require('./lessons/MissingInteger');
// solution = myMissingInteger([-125,6,-25,500,2,100,99,2,1,-60,-2,6,36])

// const genomicRangeQueryBest = require('./lessons/GenomicRangeQuery')
// solution = genomicRangeQueryBest('CAGCCTA',[2,5,0],[4,5,6])

// const triangle = require('./lessons/Triangle');
// solution = triangle([1,2,3,5,8,10])

const bracketTest = require('./lessons/07-01-Brackets-Stack-Queue');
solution = bracketTest('{[(){}]}()');

console.log(solution)