import { diffArrays } from 'diff';

import { isTokenWhitespace, Token } from '../tokenize';

export interface TokenDiff {
  leftIndex: number | null;
  rightIndex: number | null;
}

export interface MovMutation {
  left: Token[];
  right: Token[];
  diffs: TokenDiff[];
}

export function calcTokenDiffs(left: Token[], right: Token[]): MovMutation {
  const diffResult = diffArrays(left, right, {
    comparator: (left, right) => {
      if (isTokenWhitespace(left) && isTokenWhitespace(right)) return true;

      return left.value === right.value;
    },
  });

  const diffs: TokenDiff[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  for (const group of diffResult) {
    const count = group.count ?? 0;
    const existedInLeft = group.added == null;
    const existedInRight = group.removed == null;

    diffs.push(
      ...group.value.map((_token, idx) => ({
        leftIndex: existedInLeft ? leftIndex + idx : null,
        rightIndex: existedInRight ? rightIndex + idx : null,
      })),
    );

    if (existedInLeft) leftIndex += count;
    if (existedInRight) rightIndex += count;
  }

  return { left, right, diffs };
}
