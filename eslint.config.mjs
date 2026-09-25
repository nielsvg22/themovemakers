import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Vaste React-versie: de automatische detectie van eslint-plugin-react werkt niet met ESLint 10.
    settings: { react: { version: '19.3' } },
    rules: {
      // De designs gebruiken gewone <img>-tags met externe (Unsplash) afbeeldingen.
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', '*.html']),
])
