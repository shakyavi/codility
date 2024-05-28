// You are given an array A consisting of N integers.
// For each number A[i] such that 0 ≤ i < N, we want to count the number of elements of the array that are not the divisors of A[i]. We say that these elements are non-divisors.
// For example, consider integer N = 5 and array A such that:
//     A[0] = 3
//     A[1] = 1
//     A[2] = 2
//     A[3] = 3
//     A[4] = 6
// For the following elements:
// A[0] = 3, the non-divisors are: 2, 6,
// A[1] = 1, the non-divisors are: 3, 2, 3, 6,
// A[2] = 2, the non-divisors are: 3, 3, 6,
// A[3] = 3, the non-divisors are: 2, 6,
// A[4] = 6, there aren't any non-divisors.
// Write a function:
// function solution(A);
// that, given an array A consisting of N integers, returns a sequence of integers representing the amount of non-divisors.
// Result array should be returned as an array of integers.
// For example, given:
//     A[0] = 3
//     A[1] = 1
//     A[2] = 2
//     A[3] = 3
//     A[4] = 6
// the function should return [2, 4, 3, 2, 0], as explained above.
// Write an efficient algorithm for the following assumptions:
// N is an integer within the range [1..50,000];
// each element of array A is an integer within the range [1..2 * N].

const countOccurrences = (xs) => {
  const counts = new Array(xs.length * 2 + 1).fill(0);

  for (const x of xs) {
    counts[x] = counts[x] + 1;
  }

  return counts;
};
// SCORE 88% (CORRECTNESS 100%; PERFORMANCE 75%;)
// Detected time complexity:O(N * log(N)) or O(N ** 2)
// CORRECTNESS tests in 0.052s, 0.056s
// PERFORMANCE tests in 0.100s, 0.088s, 0.092s, 0.316s; failed large_range (1/4)
function nonDivisibles(xs) {
  const counts = countOccurrences(xs);
  const max = xs.length * 2;
  const sieve = new Array(max + 1).fill(0);

  for (let i = 1; i <= max; i++) {
    const n = counts[i];
    if (n !== 0) {
      for (j = i; j <= max; j += i) {
        sieve[j] -= n;
      }
    }
  }
  return xs.map((x) => xs.length + sieve[x]);
}

//SOLUTION 2
// SCORE 55% (CORRECTNESS 100%; PERFORMANCE 0%;)
// Detected time complexity:O(N ** 2)
// CORRECTNESS tests in 0.052s, 0.056s
// failed all PERFORMANCE tests
const countFromFactors = (x, counts) => {
  let count = 0;
  let root = Math.floor(Math.sqrt(x));

  if (Math.pow(root, 2) === x) {
    count += counts[root];
  } else {
    root++;
  }

  for (i = 1; i < root; i++) {
    if (x % i === 0) {
      count += counts[i];
      count += counts[x / i];
    }
  }

  return count;
};

function nonDivisiblesSR(xs) {
  const counts = countOccurrences(xs);
  return xs.map((x) => xs.length - countFromFactors(x, counts));
}

//SOLUTION 3
// SCORE 66% (CORRECTNESS 100%; PERFORMANCE 25%;)
// Detected time complexity:O(N ** 2)
// CORRECTNESS tests in 0.052s, 0.056s
// failed (3/4) PERFORMANCE tests
function nonDivisiblesBalazsnemeth(A) {
  const divisors = A.map((e) => 0);

  for (let i = 0; i < A.length; i++) {
    let e = A[i];
    for (let j = i + 1; j < A.length; j++) {
      let f = A[j];
      if (f % e === 0) {
        divisors[j]++;
      }
      if (e % f === 0) {
        divisors[i]++;
      }
    }
  }
  const res = divisors.map((e) => A.length - e - 1);
  return res;
}

//SOLUTION 4
// SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
// Detected time complexity:O(N * log(N))
// CORRECTNESS tests in 0.052s, 0.056s
// PERFORMANCE tests in 0.068s, 0.100s, 0.096s, 0.124s, 0.196s
function nonDivisiblesMineIt(A) {
  const arr = Array(Math.max(...A) + 1).fill(0);
  A.forEach((e) => {
    arr[e]++;
  });

  return A.map((v) => {
    let count = 0;
    for (let i = 1; i * i <= v; i++) {
      if (v % i === 0) {
        count += arr[i];
        if (v / i !== i) count += arr[v / i];
      }
    }
    return A.length - count;
  });
}

module.exports = { nonDivisibles, nonDivisiblesBalazsnemeth,nonDivisiblesSR, nonDivisiblesMineIt };
