import '@/styles/app.css';

import { Footer, Navbar, RemoteLogo } from '@tuwaio/docs-ui';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Layout } from 'nextra-theme-docs';

import { navLinks } from '@/constants';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const LOGO_URL = 'https://cdn.jsdelivr.net/gh/TuwaIO/workflows@main/preview/logo_v2.svg';
const logo = (
  <RemoteLogo url={LOGO_URL} width={126} height={40} className="tuwadocs:transition-opacity tuwadocs:duration-300" />
);

// --- Metadata Configuration ---
export const metadata: Metadata = {
  title: {
    default: 'TUWA SDK Documentation',
    template: '%s – TUWA SDK',
  },
  description:
    'Documentation for the TUWA SDK: @tuwaio/sdk and its EVM and Solana add-ons, one set of packages for React apps built on the TUWA ecosystem, and @tuwaio/quasar-sdk, the client of the Quasar API.',
  manifest: '/manifest.json',
  icons: {
    icon: 'https://cdn.jsdelivr.net/gh/TuwaIO/workflows@main/favicon/icon0.svg',
    shortcut: 'https://cdn.jsdelivr.net/gh/TuwaIO/workflows@main/favicon/web-app-manifest-512x512.png',
    apple: 'https://cdn.jsdelivr.net/gh/TuwaIO/workflows@main/favicon/web-app-manifest-512x512.png',
  },
  keywords: [
    'tuwa',
    'tuwa sdk',
    'web3 sdk',
    'react',
    'wallet connection',
    'transaction tracking',
    'multi-chain',
    'evm',
    'wagmi',
    'viem',
    'solana',
    '@solana/kit',
    'siwx',
    'quasar',
    'typescript',
  ],
  authors: [{ name: 'TUWA', url: 'https://github.com/TuwaIO' }],

  openGraph: {
    title: 'TUWA SDK Documentation',
    description:
      'Documentation for the TUWA SDK: @tuwaio/sdk and its EVM and Solana add-ons, one set of packages for React apps built on the TUWA ecosystem, and @tuwaio/quasar-sdk, the client of the Quasar API.',
    url: 'https://sdk.docs.tuwa.io/',
    siteName: 'TUWA SDK Docs',
    images: [
      {
        url: 'https://cdn.jsdelivr.net/gh/TuwaIO/workflows@main/preview/preview-logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TUWA SDK Documentation',
    description:
      'Documentation for the TUWA SDK: @tuwaio/sdk and its EVM and Solana add-ons, one set of packages for React apps built on the TUWA ecosystem, and @tuwaio/quasar-sdk, the client of the Quasar API.',
    images: ['https://cdn.jsdelivr.net/gh/TuwaIO/workflows@main/preview/preview-logo.png'],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="apple-mobile-web-app-title" content="TUWA SDK Docs" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <Layout
          navbar={<Navbar key="navbar" links={navLinks} logo={logo} />}
          footer={<Footer key="footer" logo={logo} />}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/TuwaIO/sdk/tree/main/apps/docs"
          navigation={{ prev: true, next: true }}
        >
          <NextTopLoader color="#6366f1" showSpinner={false} />
          {children}
        </Layout>
      </body>
    </html>
  );
}
