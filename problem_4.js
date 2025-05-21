/**
 * Given a number from 0 to 999,999,999,999, spell out that number in English.
 */
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

