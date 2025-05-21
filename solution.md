## Problem 1
- Given a string, return the first non-repeating character in it and return its index. If it does not exist, return -1.

### Solution
```ts
function findFirstNonRepeatingCha(str) {
    let strArr = str.split("");
    
    for (let i=0; i<strArr.length; i++) {
        const current = strArr[i];
        let check = true;

        for (let j=0; j<strArr.length; j++) {

            if (i===j) continue;
            
            if (current === strArr[j]) {
                check = false;
                break;
            }
        }
        
        if (check) return [current, i];
    }
    
    return -1;
}

console.log(findFirstNonRepeatingCha("TTo")); // [ 'o', 2 ]
console.log(findFirstNonRepeatingCha("TTy programiz.pro")); // [ 'y', 2 ]
```

### Thought Process
- First, I converted the string to an array and used a double loop to check if a non-repeating character exists and return the first one that matches the conditions.

## Problem 2
- Implement the `accumulate` operation, which, given a collection and an operation to perform on each element of the collection, returns a new collection containing the result of applying that operation to each element of the input collection.

### Solution
```ts
function accumulate(func ,...arr) {
    let newArr = [];
    
    for (const num of arr) {
		if (typeof num != "number") throw Error("wrong type");

        newArr.push(func(num))
    }
    
    return newArr;
}
console.log(accumulate((x) => x*3, 1, 2, 3, 4, 5, 6)); // [ 3, 6, 9, 12, 15, 18 ]
```

### Assumptions
- Here I assumed that, we are passing an uncountable number of elementes, hence I used the rest operator in js.
- Also I haved added a type check to check if all the elemnts passed are numbers.
- The func, should follow the following format
	- It should always take one value and return one value.

### Thought Process
- First, I converted the uncountable number of elementes to an array using the rest operator.
- Then I used the passed function to mutate those values and add to the new array.
- In javascript without manually doing this we can simply use the `.map()` to implement this too.

## Problem 3
- Implement the `accumulate` operation, which, given a collection and an operation to perform on each element of the collection, returns a new collection containing the result of applying that operation to each element of the input collection.

### Solution
```ts
function dominoes(stones) {
    const valMap = new Map();
    const adjMap = new Map();

    // create graph and valMap
    for (let i = 0; i < stones.length; i++) {
        const [a, b] = stones[i];

        // Keep track of which dominoes contain which values
        valMap.set(a, (valMap.get(a) || 0) + 1);
        valMap.set(b, (valMap.get(b) || 0) + 1);

        if (!adjMap.has(a)) adjMap.set(a, []);
        if (!adjMap.has(b)) adjMap.set(b, []);
        adjMap.get(a).push({ to: b, index: i });
        adjMap.get(b).push({ to: a, index: i });
    }

    // check if the values are even
    for (let [key, count] of valMap) {
        if (count % 2 !== 0) return "NO";
    }

    // DFS-based Hierholzer’s algorithm to find a valid path
    const used = new Array(stones.length).fill(false);
    const result = [];

    function dfs(u) {
        const neighbors = adjMap.get(u);
        while (neighbors && neighbors.length) {
            const { to, index } = neighbors.pop();
            if (used[index]) continue;
            used[index] = true;

            const reverse = adjMap.get(to);
            const revIndex = reverse.findIndex(e => e.to === u && e.index === index);
            if (revIndex !== -1) reverse.splice(revIndex, 1);

            dfs(to);
            result.push([u, to]);
        }
    }

    dfs(stones[0][0]);

    if (result.length !== stones.length) return "NO";

    return result.reverse();
}

console.log(dominoes([[2,1], [2,3], [1,3]])); //[ [ 1, 2 ], [ 2, 3 ], [ 3, 1 ] ]
console.log(dominoes([[1,2], [4,1], [2,3]])); // NO
```

### Thought Process
- First, I created a map to store the adjacency list of each stone and count the number of stones.
- Then, I checked if the number of stones is even. If it's not, it's impossible to make a chain, so I returned "NO".
- Next, I used a DFS based algorithm to find a valid path.
- Finally, I checked if the path contains all the stones. If it does, I returned the path in reverse order; otherwise, I returned "NO".

## Problem 4
- Given a number from 0 to 999,999,999,999, spell out that number in English.

### Solution
```ts
function chunkedNumberWithScales(n) {
    // Function to convert numbers under 1000 to words
    function spellUnder1000(n) {

        // Function to convert numbers under 100 to words
        function numberToWordsUnder100(n) {
            const ones = [
                "zero", "one", "two", "three", "four", "five", "six",
                "seven", "eight", "nine", "ten", "eleven", "twelve",
                "thirteen", "fourteen", "fifteen", "sixteen",
                "seventeen", "eighteen", "nineteen"
            ];

            const tens = [
                "", "", "twenty", "thirty", "forty", "fifty",
                "sixty", "seventy", "eighty", "ninety"
            ];

            if (n < 20) return ones[n];
            const ten = Math.floor(n / 10);
            const one = n % 10;

            return one === 0 
                ? tens[ten] 
                : `${tens[ten]}-${ones[one]}`;
        }

        if (n === 0) return '';
        if (n < 100) return numberToWordsUnder100(n);

        const ones = [
            "zero", "one", "two", "three", "four", "five", "six",
            "seven", "eight", "nine"
        ];

        const hundred = Math.floor(n / 100);
        const rest = n % 100;

        return rest === 0
            ? `${ones[hundred]} hundred`
            : `${ones[hundred]} hundred ${numberToWordsUnder100(rest)}`;
    } 

    // Function to split the number into chunks of thousands
    function splitIntoThousands(n) {
        const parts = [];
        while (n > 0) {
            parts.unshift(n % 1000);
            n = Math.floor(n / 1000);
        }
        return parts;
    }

    if (n === 0) return "zero";

    const scales = ["", "thousand", "million", "billion", "trillion"];
    const chunks = splitIntoThousands(n);

    let result = [];

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[chunks.length - 1 - i];

        if (chunk === 0) continue;

        result.unshift(`${spellUnder1000(chunk)}${scales[i] ? ' ' + scales[i] : ''}`);
    }

    return result.join(' ').trim();
}

function numberToEnglish(n) {
    if (typeof n !== "number" || !Number.isInteger(n) || n < 0 || n > 999_999_999_999)
        throw new Error("Input must be an integer from 0 to 999,999,999,999");

    return chunkedNumberWithScales(n);
}

console.log(numberToEnglish(0));         // "zero"
console.log(numberToEnglish(14));        // "fourteen"
console.log(numberToEnglish(50));        // "fifty"
console.log(numberToEnglish(98));        // "ninety-eight"
console.log(numberToEnglish(1));         // "one"
console.log(numberToEnglish(100));       // "one hundred"
console.log(numberToEnglish(12345));     // "twelve thousand three hundred forty-five"
console.log(numberToEnglish(1234567890));// "one billion two hundred thirty-four million five hundred sixty-seven thousand eight hundred ninety"
```

### Thought Process
- First, I split the number into chunks of 3 digits.
- Then, I converted each chunk into English.
- Finally, I added the appropriate scale (thousand, million, etc.) to each chunk and joined them together to form the final result.

## Problem 5
- Given the position of two queens on a chess board, indicate whether or not they are positioned so that they can attack each other.

### Solution
```ts
function twoQueens(one, two) {
    const line = {
        "a": 0,
        "b": 1,
        "c": 2,
        "d": 3,
        "e": 4,
        "f": 5,
        "g": 6,
        "h": 7,
    };
    
    const oneArr = one.split("");
    oneArr[0] = line[oneArr[0]];
    oneArr[1] = parseInt(oneArr[1]);
    
    const twoArr = two.split("");
    twoArr[0] = line[twoArr[0]];
    twoArr[1] = parseInt(twoArr[1]);
    
    // check horizontal and vertical spaces
    if (oneArr[0] === twoArr[0]) return "YES";
    if (oneArr[1] === twoArr[1]) return "YES";
    
    // check diagonals
    const check = Math.abs(oneArr[0] - twoArr[0]);
    const possibles = [oneArr[1]+check, oneArr[1]-check];
    
    if (possibles[0] ===twoArr[1] ||  possibles[1] ===twoArr[1]) return "YES";
    
    return "NO";
}

console.log(twoQueens("c5", "f2")); // YES
console.log(twoQueens("c5", "a7")); // YES
console.log(twoQueens("c5", "a6")); // YES
```

### Thought Process
- Created an map to convert the letter to a number to iterate quickly.
- First checked if the two queens are in their respective horizontal or vertical vicinities.
- Then checked the diagonals, by calculating the possible location that the other queen should be in the given its first
axis value to be in the vicinity of the first queen, and checked if its diagonal to the first queen.

## Problem 6
- Parse and evaluate simple math word problems returning the answer as an integer.

### Solution
```ts
function simpleMathWord(str) {
    // operations map
    const opr = {
        'plus': (x, y) => x+y,
        'minus': (x, y) => x-y,
        'multiplied by': (x, y) => x*y,
        'divided by': (x, y) => x/y
    }
    
    // string array created to remove the last `?`
    let strArr = str.split("");
    str = "";
    
    if (strArr[strArr.length - 1] != "?") throw Error("wrong format");
    
    // created the sting with out the "?"
    for (let i=0; i<strArr.length-1; i++) {
        str +=strArr[i];
    }
    
    strArr = str.split(" ");
    
    // initial format error check
    if (strArr.length <= 2 || strArr[0]!="What" || strArr[1] != "is") throw Error("wrong format");
    
    // operands in the phrase
    const mathOperands = [];
    
    // capture the operands
    for (let i=2; i<strArr.length; i++) {
        if ((strArr[i] === 'multiplied' || strArr[i] === 'divided') && strArr[i + 1] === 'by') {
            mathOperands.push(`${strArr[i]} by`);
            i++; // skip next word
        } else {
            mathOperands.push(strArr[i]);
        }
    }
    
    let result = parseFloat(mathOperands[0]);
    
    for (let i = 1; i < mathOperands.length; i += 2) {
        const op = mathOperands[i];
        const nextNum = parseFloat(mathOperands[i + 1]);

        result = opr[op](result, nextNum);
    }

    if (isNaN(result)) throw Error("wrong format");
    
    return parseInt(result);
}

console.log(simpleMathWord("What is 5?"));  
console.log(simpleMathWord("What is 5 plus 13?"));                 // 18
console.log(simpleMathWord("What is 7 minus 5?"));                 // 2
console.log(simpleMathWord("What is 6 multiplied by 4?"));         // 24
console.log(simpleMathWord("What is 25 divided by 5?"));           // 5
console.log(simpleMathWord("What is 5 plus 13 plus 6?"));          // 24
console.log(simpleMathWord("What is 3 plus 2 multiplied by 3?"));  // 15
```

### Thought Process
- Created an map to hold the operators and its related functions.
- Next step was to remove the last element, which is the "?", to do that I convert the string to an array and remove the
last element by creating a new string without that charachter.
- After that I convert the next string to an array spliting with spaces, and remove the first 2 elements from it.
- After that I loop through it to capture the operands, and then looped again to calculate the result.
