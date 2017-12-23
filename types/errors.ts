export type QueryError =
| 'parseError'
| 'parentCombinator' | 'adjacentCombinators' | 'endingCombinator' | 'leadingCombinator'
| 'isPseudoSelector' | 'hasPseudoSelector' | 'unknownPseudoSelector'
| 'nthOfTypeDataError';