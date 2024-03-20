import memoize from 'memoizerific';
import Prism, { type TokenStream } from 'prismjs';
import { isSpaces, splitToTokens } from '@/utils/string';

import { type Language } from '../code-lang/languages';

interface RawToken {
  value: string;
  types: string[];
}

export interface Token extends RawToken {
  invisible: boolean;
}

function createTokens(code: string, language: Language): Token[] {
  const rawTokens = flattenPrismTokens(
    Prism.tokenize(code, Prism.languages[language])
  );

  return processRawTokens(rawTokens);
}

function flattenPrismTokens(tokens: TokenStream, types?: string[]): RawToken[] {
  if (Array.isArray(tokens)) {
    return tokens.flatMap((token) => flattenPrismTokens(token, types));
  }

  if (typeof tokens === 'string') {
    return [
      {
        value: tokens,
        types: [],
      },
    ];
  }

  const joinedTypes = types?.includes(tokens.type)
    ? types
    : [...(types ?? []), tokens.type];

  if (typeof tokens.content === 'string') {
    return [
      {
        value: tokens.content,
        types: joinedTypes,
      },
    ];
  }

  return flattenPrismTokens(tokens.content, joinedTypes);
}

function processRawTokens(baseTokens: RawToken[]): Token[] {
  const tokens: Token[] = [];

  for (const token of baseTokens) {
    const subTokens = splitToTokens(token.value);

    for (const subToken of subTokens) {
      tokens.push({
        ...token,
        value: subToken,
        invisible: isSpaces(subToken),
      });
    }
  }

  return tokens;
}

export function isTokenWhitespace(token: Token) {
  return isSpaces(token.value);
}

export const memoizedCreateTokens = memoize(256)(createTokens);
