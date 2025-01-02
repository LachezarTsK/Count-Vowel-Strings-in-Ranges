
function vowelStrings(words: string[], queries: number[][]): number[] {
    const prefixSum = createPrefixSumForWordsThatStartAndEndWithVowel(words);
    return countNumberOfWordsInInclusiveRangeThatStartAndEndWithVowel(prefixSum, queries);
};

function createPrefixSumForWordsThatStartAndEndWithVowel(words: string[]): number[] {
    const prefixSum = new Array(words.length);
    prefixSum[0] = startsAndEndsWithVowel(words[0]) ? 1 : 0;
    for (let i = 1; i < words.length; ++i) {
        prefixSum[i] = prefixSum[i - 1] + (startsAndEndsWithVowel(words[i]) ? 1 : 0);
    }
    return prefixSum;
}

function countNumberOfWordsInInclusiveRangeThatStartAndEndWithVowel(prefixSum: number[], queries: number[][]): number[] {
    const numberOfWordsInInclusiveRangeThatStartAndEndWithVowel = new Array(queries.length);
    for (let i = 0; i < queries.length; ++i) {
        const [start, end] = queries[i];
        numberOfWordsInInclusiveRangeThatStartAndEndWithVowel[i]
            = prefixSum[end] - (start > 0 ? prefixSum[start - 1] : 0);
    }
    return numberOfWordsInInclusiveRangeThatStartAndEndWithVowel;
}

function startsAndEndsWithVowel(word: string): boolean {
    return isVowel(word.charAt(0)) && isVowel(word.charAt(word.length - 1));
}

function isVowel(letter: string): boolean {
    return letter === 'a' || letter === 'e' || letter === 'i' || letter === 'o' || letter === 'u';
}
