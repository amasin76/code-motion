import memoize from 'memoizerific';
import { BundledLanguage, codeToTokens, ThemedToken } from 'shiki';
import { isSpaces, splitToTokens } from '@/utils/string';

export interface BaseToken {
  value: string;
  color: string | undefined;
}

export interface Token extends BaseToken {
  invisible: boolean;
}

async function createTokens(
  code: string,
  language: BundledLanguage,
): Promise<Token[]> {
  const { tokens } = await codeToTokens(code, {
    lang: language,
    theme: 'tokyo-night',
  });

  console.log(language);

  const baseTokens = flattenShikiTokens(tokens);
  return processTokensWithAttrs(baseTokens);
}

function flattenShikiTokens(tokens: ThemedToken[][]): BaseToken[] {
  return tokens.flatMap((tokens, i, arr) =>
    tokens
      .map((token) => ({
        value: token.content,
        color: token.color,
      }))
      .concat(i < arr.length - 1 ? { value: '\n', color: 'transparent' } : []),
  );
}

function processTokensWithAttrs(baseTokens: BaseToken[]) {
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
