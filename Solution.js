
/**
 * @param {string[]} words
 * @param {number[][]} queries
 * @return {number[]}
 */
var vowelStrings = function (words, queries) {
    const prefixSum = createPrefixSumForWordsThatStartAndEndWithVowel(words);
    return countNumberOfWordsInInclusiveRangeThatStartAndEndWithVowel(prefixSum, queries);
};

/**
 * @param {string[]} words
 * @return {number[]}
 */
function createPrefixSumForWordsThatStartAndEndWithVowel(words) {
    const prefixSum = new Array(words.length);
    prefixSum[0] = startsAndEndsWithVowel(words[0]) ? 1 : 0;
    for (let i = 1; i < words.length; ++i) {
        prefixSum[i] = prefixSum[i - 1] + (startsAndEndsWithVowel(words[i]) ? 1 : 0);
    }
    return prefixSum;
}

/**
 * @param {number[]} prefixSum
 * @param {number[][]} queries
 * @return {number[]}
 */
function countNumberOfWordsInInclusiveRangeThatStartAndEndWithVowel(prefixSum, queries) {
    const numberOfWordsInInclusiveRangeThatStartAndEndWithVowel = new Array(queries.length);
    for (let i = 0; i < queries.length; ++i) {
        const [start, end] = queries[i];
        numberOfWordsInInclusiveRangeThatStartAndEndWithVowel[i]
                = prefixSum[end] - (start > 0 ? prefixSum[start - 1] : 0);
    }
    return numberOfWordsInInclusiveRangeThatStartAndEndWithVowel;
}

/**
 * @param {string} word
 * @return {boolean}
 */
function startsAndEndsWithVowel(word) {
    return isVowel(word.charAt(0)) && isVowel(word.charAt(word.length - 1));
}

/**
 * @param {string} letter
 * @return {boolean}
 */
function isVowel(letter) {
    return letter === 'a' || letter === 'e' || letter === 'i' || letter === 'o' || letter === 'u';
}
