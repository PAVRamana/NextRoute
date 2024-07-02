import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SessionWrapper from './components/SessionWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'New Jointer Form Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionWrapper>
        <html lang='en'>
          <body
            className={inter.className}
            style={{ margin: 0, background: '#f2f5f7' }}
          >
            {children}
          </body>
        </html>
      </SessionWrapper>
    </>
  );
}
