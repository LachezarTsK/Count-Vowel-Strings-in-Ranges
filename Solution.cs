
using System;

public class Solution
{
    public int[] VowelStrings(string[] words, int[][] queries)
    {
        int[] prefixSum = CreatePrefixSumForWordsThatStartAndEndWithVowel(words);
        return CountNumberOfWordsInInclusiveRangeThatStartAndEndWithVowel(prefixSum, queries);
    }

    private int[] CreatePrefixSumForWordsThatStartAndEndWithVowel(String[] words)
    {
        int[] prefixSum = new int[words.Length];
        prefixSum[0] = StartsAndEndsWithVowel(words[0]) ? 1 : 0;
        for (int i = 1; i < words.Length; ++i)
        {
            prefixSum[i] = prefixSum[i - 1] + (StartsAndEndsWithVowel(words[i]) ? 1 : 0);
        }
        return prefixSum;
    }

    private int[] CountNumberOfWordsInInclusiveRangeThatStartAndEndWithVowel(int[] prefixSum, int[][] queries)
    {
        int[] numberOfWordsInInclusiveRangeThatStartAndEndWithVowel = new int[queries.Length];
        for (int i = 0; i < queries.Length; ++i)
        {
            int start = queries[i][0];
            int end = queries[i][1];
            numberOfWordsInInclusiveRangeThatStartAndEndWithVowel[i]
                    = prefixSum[end] - (start > 0 ? prefixSum[start - 1] : 0);
        }
        return numberOfWordsInInclusiveRangeThatStartAndEndWithVowel;
    }

    private bool StartsAndEndsWithVowel(String word)
    {
        return IsVowel(word[0]) && IsVowel(word[word.Length - 1]);
    }

    private bool IsVowel(char letter)
    {
        return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u';
    }
}
