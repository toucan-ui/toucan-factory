import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { ThemeSwitcher } from './_shared/theme-switcher';
import './globals.css';

export const metadata: Metadata = {
  title: 'Toucan',
  description:
    'A modular, token-driven design system — patterns compose atoms, atoms reference tokens, themes override tokens.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" data-theme="toucan" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('tcn-color-mode');var r=(s==='light'||s==='dark')?s:window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.mode=r;var t=localStorage.getItem('tcn-theme');if(t)document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.mode='light'}})()`,
          }}
        />
      </head>
      <body>
        {children}
        <ThemeSwitcher />
        <Analytics />
      </body>
    </html>
  );
}
