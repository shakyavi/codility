// A DNA sequence can be represented as a string consisting of the letters A, C, G and T, which correspond to the types of successive nucleotides in the sequence. Each nucleotide has an impact factor, which is an integer. Nucleotides of types A, C, G and T have impact factors of 1, 2, 3 and 4, respectively. You are going to answer several queries of the form: What is the minimal impact factor of nucleotides contained in a particular part of the given DNA sequence?

// The DNA sequence is given as a non-empty string S = S[0]S[1]...S[N-1] consisting of N characters. There are M queries, which are given in non-empty arrays P and Q, each consisting of M integers. The K-th query (0 ≤ K < M) requires you to find the minimal impact factor of nucleotides contained in the DNA sequence between positions P[K] and Q[K] (inclusive).

// For example, consider string S = CAGCCTA and arrays P, Q such that:

//     P[0] = 2    Q[0] = 4
//     P[1] = 5    Q[1] = 5
//     P[2] = 0    Q[2] = 6
// The answers to these M = 3 queries are as follows:

// The part of the DNA between positions 2 and 4 contains nucleotides G and C (twice), whose impact factors are 3 and 2 respectively, so the answer is 2.
// The part between positions 5 and 5 contains a single nucleotide T, whose impact factor is 4, so the answer is 4.
// The part between positions 0 and 6 (the whole string) contains all nucleotides, in particular nucleotide A whose impact factor is 1, so the answer is 1.
// Write a function:

// function solution(S, P, Q);

// that, given a non-empty string S consisting of N characters and two non-empty arrays P and Q consisting of M integers, returns an array consisting of M integers specifying the consecutive answers to all queries.

// Result array should be returned as an array of integers.

// For example, given the string S = CAGCCTA and arrays P, Q such that:

//     P[0] = 2    Q[0] = 4
//     P[1] = 5    Q[1] = 5
//     P[2] = 0    Q[2] = 6
// the function should return the values [2, 4, 1], as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// M is an integer within the range [1..50,000];
// each element of arrays P and Q is an integer within the range [0..N - 1];
// P[K] ≤ Q[K], where 0 ≤ K < M;
// string S consists only of upper-case English letters A, C, G, T.

//SCORE 25% (CORRECTNESS 40%; PERFORMANCE 0%;)
//failed extreme_double, simple, small_length_string (3/5) correctness tests
//failed almost_all_same_letters, large_random, extreme_large (all) performance tests
function genomicRangeQuery(S, P, Q) {
  // Implement your solution here
  const impF = ["A", "C", "G", "T"];
  const seq = S.split("").map((s) => impF.indexOf(s) + 1);
  const result = [];
  for (let i = 0; i < P.length; i++) {
    let start = P[i];
    let end = Q[i];
    let sub = [];
    if (end - start + 1 === seq.length) sub = seq;
    else if (start !== 0) {
      end++;
      sub = seq.slice(start, end);
    }
    const minm = Math.min(...sub);
    result[i] = minm;
  }
  return result;
}

//SCORE 62% (CORRECTNESS 100%; PERFORMANCE 0%;)
//Complexity O(N*M)
//failed almost_all_same_letters, large_random, extreme_large (all) performance tests
function genomicRangeQuery02(S, P, Q) {
  const result = [];
  const factors = { A: 1, C: 2, G: 3, T: 4 };
  for (let i = 0; i < P.length; i++) {
    const sub = S.substring(P[i], Q[i] + 1).split("");
    const dist = [...new Set(sub)];
    if (dist.length === 1) result[i] = factors[`${dist[0]}`];
    else if (dist.indexOf("A") !== -1) result[i] = 1;
    else if (dist.indexOf("C") !== -1) result[i] = 2;
    else if (dist.indexOf("G") !== -1) result[i] = 3;
    else result[i] = 4;
  }
  return result;
}

//SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
//Complexity O(N+M)
const factorMap = {
  A: 1,
  C: 2,
  G: 3,
  T: 4,
};

const keyFor = (from, to) => `${from}_${to}`;

const genomicRangeQueryBest = (s, ps, qs) => {
    console.log(`s=${s}`)
  const ranges = new Array(s.length).fill(undefined);
  console.log(`ranges `, JSON.stringify(ranges));
  const init = Object.values(factorMap).reduce(
    (acc, cur) => ({ ...acc, [cur]: 0 }),
    {}
  );
  console.log(`init `, JSON.stringify(init));

  //Maps the given DNA sequence into an object with number of occurences of each factor
  for (let i = 0; i < s.length; i++) {
    const prevRange = ranges[i - 1] || init;
    console.log(`\n#${i}-prevRange=${JSON.stringify(prevRange)}`);
    const curFactor = factorMap[s[i]];
    console.log(`#${i}-curFactor=${curFactor}`);
    ranges[i] = { ...prevRange, [curFactor]: prevRange[curFactor] + 1 };
    console.log(`#${i}-ranges[${i}]=${JSON.stringify(ranges[i])}`);
  }

  const solveQuery = (from, to) => {
    console.log(`\nfrom=${from};to=${to}`)
    const fromFactor = factorMap[s[from]];
    const rangeFrom = ranges[from];
    const rangeTo = ranges[to];
    console.log(`fromFactor=${fromFactor}; rangeFrom=${JSON.stringify(rangeFrom)}; rangeTo=${JSON.stringify(rangeTo)}`)
    const factorsInRange = [
      fromFactor,
      ...Object.values(factorMap)
        .map((f) => ({ f, v: rangeTo[f] - rangeFrom[f] }))
        .filter(({ v }) => v > 0)
        .map(({ f }) => f),
    ];
    console.log('factorsInRange',JSON.stringify(factorsInRange))
    return Math.min(...factorsInRange);
  };

  return ps.map((p, pIdx) => solveQuery(p, qs[pIdx]));
};

module.exports = genomicRangeQueryBest;
