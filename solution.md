## Problem 1
- Given a string, return the first non-repeating character in it and return its index. If it does not exist, return -1.

### Solution
```ts
 function  findFirstNonRepeatingCha(str) {
	let  strArr  =  str.split("");
	for (let  i=0; i<strArr.length; i++) {
		const  current  =  strArr[i];
		let  check  =  true;
		for (let  j=0; j<strArr.length; j++) {
			if (i===j) continue;
			if (current  ===  strArr[j]) {
				check  =  false;
				break;
			}
		}
		if (check) return [current, i];
	}
	return  -1;
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
