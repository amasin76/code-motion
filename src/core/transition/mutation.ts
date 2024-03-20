import { diffArrays } from 'diff';

import { isTokenWhitespace, type Token } from '../tokenize/index';

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
    comparator: (leftToken, rightToken) =>
      (isTokenWhitespace(leftToken) && isTokenWhitespace(rightToken)) ||
      leftToken.value === rightToken.value,
  });

  const diffs: TokenDiff[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  for (const group of diffResult) {
    const existedInLeft = group.added === undefined;
    const existedInRight = group.removed === undefined;

    diffs.push(
      ...group.value.map((_token, idx) => ({
        leftIndex: existedInLeft ? leftIndex + idx : null,
        rightIndex: existedInRight ? rightIndex + idx : null,
      }))
    );

    leftIndex += existedInLeft ? group.count || 0 : 0;
    rightIndex += existedInRight ? group.count || 0 : 0;
  }

  return {
    left,
    right,
    diffs,
  };
}
