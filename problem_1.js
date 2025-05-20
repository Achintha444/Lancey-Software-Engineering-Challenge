/**
 * Given a string, return the first non-repeating character in it and return its index. 
 * If it does not exist, return -1.
 */
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
