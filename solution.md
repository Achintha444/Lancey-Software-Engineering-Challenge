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