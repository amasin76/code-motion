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

export async function createDoc(raw: RawDoc): Promise<Doc> {
  const snapshots = await Promise.all(
    raw.snapshots.map(async (snapshot) => ({
      // @ts-expect-error: temp until remove @uiw/langs
      tokens: await memoizedCreateTokens(snapshot.code, raw.language),
      linesCount: getLinesCount(snapshot.code),
    })),
  );

  const transitions = createArray(snapshots.length - 1, (index) =>
    calcTokenDiffs(snapshots[index].tokens, snapshots[index + 1].tokens),
  );

  return {
    raw,
    snapshots,
    transitions,
  };
}
