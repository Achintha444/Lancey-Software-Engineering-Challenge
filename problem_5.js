/**
 * Given the position of two queens on a chess board, indicate whether or not they are positioned so that they can attack each other.
 */
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
