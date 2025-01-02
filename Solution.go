
package main

import "fmt"

func vowelStrings(words []string, queries [][]int) []int {
    prefixSum := createPrefixSumForWordsThatStartAndEndWithVowel(words)
    return countNumberOfWordsInInclusiveRangeThatStartAndEndWithVowel(prefixSum, queries)
}

func createPrefixSumForWordsThatStartAndEndWithVowel(words []string) []int {
    prefixSum := make([]int, len(words))
    if startsAndEndsWithVowel(words[0]) {
        prefixSum[0] = 1
    }
    for i := 1; i < len(words); i++ {
        prefixSum[i] = prefixSum[i - 1]
        if startsAndEndsWithVowel(words[i]) {
            prefixSum[i]++
        }
    }
    return prefixSum
}

func countNumberOfWordsInInclusiveRangeThatStartAndEndWithVowel(prefixSum []int, queries [][]int) []int {
    numberOfWordsInInclusiveRangeThatStartAndEndWithVowel := make([]int, len(queries))
    for i := range queries {
        start := queries[i][0]
        end := queries[i][1]
        numberOfWordsInInclusiveRangeThatStartAndEndWithVowel[i] = prefixSum[end]
        if start > 0 {
            numberOfWordsInInclusiveRangeThatStartAndEndWithVowel[i] -= prefixSum[start - 1]
        }
    }
    return numberOfWordsInInclusiveRangeThatStartAndEndWithVowel
}

func startsAndEndsWithVowel(word string) bool {
    return isVowel(word[0]) && isVowel(word[len(word) - 1])
}

func isVowel(letter byte) bool {
    return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u'
}
