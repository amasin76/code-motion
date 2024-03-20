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

import 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-xml-doc';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-json5';

export enum Language {
  typescript = 'typescript',
  tsx = 'tsx',
  cpp = 'cpp',
  css = 'css',
  html = 'html',
  javascript = 'javascript',
  jsx = 'jsx',
  json = 'json',
  python = 'python',
  rust = 'rust',
  sql = 'sql',
  xml = 'xml',
}

export const codeMirrorLanguageMap: Record<Language, LanguageSupport> = {
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
