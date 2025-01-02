
class Solution {

    fun vowelStrings(words: Array<String>, queries: Array<IntArray>): IntArray {
        val prefixSum = createPrefixSumForWordsThatStartAndEndWithVowel(words)
        return countNumberOfWordsInInclusiveRangeThatStartAndEndWithVowel(prefixSum, queries)
    }

    private fun createPrefixSumForWordsThatStartAndEndWithVowel(words: Array<String>): IntArray {
        val prefixSum = IntArray(words.size)
        prefixSum[0] = if (startsAndEndsWithVowel(words[0])) 1 else 0
        for (i in 1..<words.size) {
            prefixSum[i] = prefixSum[i - 1] + (if (startsAndEndsWithVowel(words[i])) 1 else 0)
        }
        return prefixSum
    }

    private fun countNumberOfWordsInInclusiveRangeThatStartAndEndWithVowel(prefixSum: IntArray, queries: Array<IntArray>): IntArray {
        val numberOfWordsInInclusiveRangeThatStartAndEndWithVowel = IntArray(queries.size)
        for (i in queries.indices) {
            val (start, end) = queries[i]
            numberOfWordsInInclusiveRangeThatStartAndEndWithVowel[i] =
                prefixSum[end] - (if (start > 0) prefixSum[start - 1] else 0)
        }
        return numberOfWordsInInclusiveRangeThatStartAndEndWithVowel
    }

    private fun startsAndEndsWithVowel(word: String): Boolean {
        return isVowel(word[0]) && isVowel(word[word.length - 1])
    }

    private fun isVowel(letter: Char): Boolean {
        return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u'
    }
}
