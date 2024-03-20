import { createArray } from '@/utils/array';
import { getLinesCount } from '@/utils/string';

import { memoizedCreateTokens, type Token } from '../tokenize/index';
import { calcTokenDiffs, type MovMutation } from '../transition/mutation';

import { type RawDoc } from './raw-doc';

export interface Snapshot {
  tokens: Token[];
  linesCount: number;
}

export interface Doc {
  raw: RawDoc;
  snapshots: Snapshot[];
  transitions: MovMutation[];
}

export function createDoc(raw: RawDoc): Doc {
  const snapshots = raw.snapshots.map<Snapshot>((snapshot) => ({
    tokens: memoizedCreateTokens(snapshot.code, raw.language),
    linesCount: getLinesCount(snapshot.code),
  }));

  const transitions = createArray(snapshots.length - 1, (index) =>
    calcTokenDiffs(snapshots[index].tokens, snapshots[index + 1].tokens)
  );

  return {
    raw,
    snapshots,
    transitions,
  };
}
