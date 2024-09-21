// A string S consisting of N characters is considered to be properly nested if any of the following conditions is true:

// S is empty;
// S has the form "(U)" or "[U]" or "{U}" where U is a properly nested string;
// S has the form "VW" where V and W are properly nested strings.
// For example, the string "{[()()]}" is properly nested but "([)()]" is not.

// Write a function:

// function solution(S);

// that, given a string S consisting of N characters, returns 1 if S is properly nested and 0 otherwise.

// For example, given S = "{[()()]}", the function should return 1 and given S = "([)()]", the function should return 0, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..200,000];
// string S is made only of the following characters: '(', '{', '[', ']', '}' and/or ')'.

//SCORE 100% (CORRECTNESS 100%; PERFORMANCE 100%;)
//Detected time complexity O(N)
function bracketTest(s) {
    const map  = {
        ")":"(",
        "}":"{",
        "]":"["
    }
    let stack = [];
    console.log('input= ',s)
    for(let i=0;i<s.length;i++){
        
        console.log(`\nstack= ${JSON.stringify(stack)}`)
        const stackLength = stack.length;
        console.log(`stackLength= ${stackLength}`)
        const currentBracket = s[i];
        console.log(`currentBracket= ${currentBracket}`)
        if(currentBracket === "(" ||
        currentBracket === "{" ||
        currentBracket === "[" ){
            stack.push(currentBracket);
        }
        else if ( stack[stackLength-1] === map[currentBracket] ){
            stack.pop();
        }
        else return 0;
    }
    return stack?.length ? 0 : 1
}

module.exports = bracketTest;