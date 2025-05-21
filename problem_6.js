/**
 * Parse and evaluate simple math word problems returning the answer as an integer.
 */
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
