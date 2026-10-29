/** Types of the Lumyx Shiki theme — the value lives in `code-theme.js`. */

export type CodeThemeSetting = {
  scope: string[];
  settings: { foreground: string };
};

export type CodeTheme = {
  name: string;
  bg: string;
  fg: string;
  settings: CodeThemeSetting[];
};

export declare const lumyxCodeTheme: CodeTheme;
