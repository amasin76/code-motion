import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { sql } from '@codemirror/lang-sql';
import { xml } from '@codemirror/lang-xml';
import { type LanguageSupport } from '@codemirror/language';

export enum Language {
  // text = '',
  cpp = 'cpp',
  css = 'css',
  html = 'html',
  javascript = 'javascript',
  jsx = 'jsx',
  typescript = 'typescript',
  tsx = 'tsx',
  json = 'json',
  python = 'python',
  rust = 'rust',
  sql = 'sql',
  xml = 'xml',
}

export const codeMirrorLanguageMap: Record<Language, LanguageSupport> = {
  // [Language.text]: null,
  [Language.typescript]: javascript({
    jsx: false,
    typescript: true,
  }),
  [Language.tsx]: javascript({
    jsx: true,
    typescript: true,
  }),
  [Language.cpp]: cpp(),
  [Language.css]: css(),
  [Language.html]: html(),
  [Language.javascript]: javascript(),
  [Language.jsx]: javascript({
    jsx: true,
    typescript: false,
  }),
  [Language.json]: json(),
  [Language.python]: python(),
  [Language.rust]: rust(),
  [Language.sql]: sql(),
  [Language.xml]: xml(),
};
