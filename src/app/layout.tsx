import { Providers } from './providers';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import Header from './_components/Header';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NextJs. SSR',
  description: 'React Course.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale || 'en'}>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <Header />
            <div className="pt-[70px] min-h-screen bg-gray-50 dark:bg-gray-800">
              {children}
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
