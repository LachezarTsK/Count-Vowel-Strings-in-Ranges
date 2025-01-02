
#include <span>
#include <vector>
#include <string>
#include <string_view>
using namespace std;

class Solution {

public:
    vector<int> vowelStrings(const vector<string>& words, const vector<vector<int>>& queries) const {
        vector<int> prefixSum = createPrefixSumForWordsThatStartAndEndWithVowel(words);
        return countNumberOfWordsInInclusiveRangeThatStartAndEndWithVowel(prefixSum, queries);
    }

private:
    vector<int> createPrefixSumForWordsThatStartAndEndWithVowel(span<const string> words) const {
        vector<int> prefixSum(words.size());
        prefixSum[0] = startsAndEndsWithVowel(words[0]) ? 1 : 0;
        for (size_t i = 1; i < words.size(); ++i) {
            prefixSum[i] = prefixSum[i - 1] + (startsAndEndsWithVowel(words[i]) ? 1 : 0);
        }
        return prefixSum;
    }

    vector<int> countNumberOfWordsInInclusiveRangeThatStartAndEndWithVowel(span<const int> prefixSum, span<const vector<int>> queries) const {
        vector<int> numberOfWordsInInclusiveRangeThatStartAndEndWithVowel(queries.size());
        for (size_t i = 0; i < queries.size(); ++i) {
            size_t start = queries[i][0];
            size_t end = queries[i][1];
            numberOfWordsInInclusiveRangeThatStartAndEndWithVowel[i]
                    = prefixSum[end] - (start > 0 ? prefixSum[start - 1] : 0);
        }
        return numberOfWordsInInclusiveRangeThatStartAndEndWithVowel;
    }

    bool startsAndEndsWithVowel(string_view word) const {
        return isVowel(word[0]) && isVowel(word[word.length() - 1]);
    }

    bool isVowel(char letter) const {
        return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u';
    }
};
