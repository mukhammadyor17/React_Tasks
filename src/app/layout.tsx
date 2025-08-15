import { Providers } from './providers';
import Header from './_components/Header';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NextJs. SSR',
  description: 'React Course.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <div className="pt-[70px] min-h-screen bg-gray-50 dark:bg-gray-800">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
