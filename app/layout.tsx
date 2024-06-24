import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { use } from 'react';
import SessionWrapper from './components/SessionWrapper';
import ServerComponent from './server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Auth Route POC',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //use(ServerComponent());
  return (
    <>
      <SessionWrapper>
        <html lang='en'>
          <body className={inter.className}>{children}</body>
        </html>
      </SessionWrapper>
    </>
  );
}
