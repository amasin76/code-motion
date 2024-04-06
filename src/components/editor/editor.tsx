import { type LanguageSupport } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { githubDark } from '@uiw/codemirror-themes-all';
import CodeMirror from '@uiw/react-codemirror';
import { useCodeEditorStore } from '@/store/code-control';

interface CodeEditorProps {
  value: string;
  language: string;
  className?: string;
  onChange: (value: string) => void;
}

function Editor({ value, language, className, onChange }: CodeEditorProps) {
  const { codeFontSize } = useCodeEditorStore((state) => ({
    codeFontSize: state.codeFontSize,
  }));

  const initTheme = EditorView.baseTheme({
    '&': {
      backgroundColor: 'transparent',
      paddingTop: '.5rem',
      paddingLeft: '.5rem',
    },
  });

  const extensions = [initTheme, loadLanguage(language) as LanguageSupport];

  const basicSetup = {
    lineNumbers: false,
    highlightActiveLine: false,
    foldGutter: false,
    dropCursor: false,
    allowMultipleSelections: false,
    indentOnInput: false,
    indentWithTab: false,
    autocompletion: false,
  };

  return (
    <CodeMirror
      value={value}
      theme={githubDark}
      extensions={extensions}
      onChange={onChange}
      className={className}
      style={{
        fontSize: `${codeFontSize}px`,
      }}
      height="100%"
      basicSetup={basicSetup}
    />
  );
}

export default Editor;
