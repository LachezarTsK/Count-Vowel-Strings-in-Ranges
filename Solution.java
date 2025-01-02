
public class Solution {

    public int[] vowelStrings(String[] words, int[][] queries) {
        int[] prefixSum = createPrefixSumForWordsThatStartAndEndWithVowel(words);
        return countNumberOfWordsInInclusiveRangeThatStartAndEndWithVowel(prefixSum, queries);
    }

    private int[] createPrefixSumForWordsThatStartAndEndWithVowel(String[] words) {
        int[] prefixSum = new int[words.length];
        prefixSum[0] = startsAndEndsWithVowel(words[0]) ? 1 : 0;
        for (int i = 1; i < words.length; ++i) {
            prefixSum[i] = prefixSum[i - 1] + (startsAndEndsWithVowel(words[i]) ? 1 : 0);
        }
        return prefixSum;
    }

    private int[] countNumberOfWordsInInclusiveRangeThatStartAndEndWithVowel(int[] prefixSum, int[][] queries) {
        int[] numberOfWordsInInclusiveRangeThatStartAndEndWithVowel = new int[queries.length];
        for (int i = 0; i < queries.length; ++i) {
            int start = queries[i][0];
            int end = queries[i][1];
            numberOfWordsInInclusiveRangeThatStartAndEndWithVowel[i]
                    = prefixSum[end] - (start > 0 ? prefixSum[start - 1] : 0);
        }
        return numberOfWordsInInclusiveRangeThatStartAndEndWithVowel;
    }

    private boolean startsAndEndsWithVowel(String word) {
        return isVowel(word.charAt(0)) && isVowel(word.charAt(word.length() - 1));
    }

    private boolean isVowel(char letter) {
        return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u';
    }
}
