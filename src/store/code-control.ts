import { create } from 'zustand';

export interface CodeControlState {
  codeFontSize: number;
  codeTabSize: number;
  codeSelectedTheme: string;
}

export interface CodeControlAction {
  setCodeFontSize: (value: number) => void;
  setCodeTabSize: (value: number) => void;
  setCodeSelectedTheme: (value: string) => void;
}

export const mirrorThemes = {
  abcdef: 'Abcdef',
  androidstudio: 'Android Studio',
  atomOne: 'Atom One',
  aura: 'Aura',
  bbedit: 'BBEdit',
  bespin: 'Bespin',
  darcula: 'Darcula',
  dracula: 'Dracula',
  duotone: 'Duotone',
  eclipse: 'Eclipse',
  github: 'GitHub',
  gruvbox: 'Gruvbox',
  material: 'Material',
  noctisLilac: 'Noctis Lilac',
  nord: 'Nord',
  okaidia: 'Okaidia',
  solarized: 'Solarized',
  sublime: 'Sublime',
  tokyoNight: 'Tokyo Night',
  tokyoNightDay: 'Tokyo Night Day',
  tokyoNightStorm: 'Tokyo Night Storm',
  vscodeDark: 'VS Code',
  xcode: 'Xcode',
};

export const useCodeEditorStore = create<CodeControlState & CodeControlAction>(
  (set) => ({
    codeFontSize: 22,
    codeTabSize: 2,
    codeSelectedTheme: 'Xcode',

    setCodeFontSize: (value) => set({ codeFontSize: value }),
    setCodeTabSize: (value) => set({ codeTabSize: value }),
    setCodeSelectedTheme: (value) => set({ codeSelectedTheme: value }),
  })
);
