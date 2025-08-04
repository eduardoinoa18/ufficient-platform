import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
    title: 'UFFICIENT Mobile',
    description: 'UFFICIENT Mobile PWA - Unlock Your Most Efficient Self',
    generator: 'Next.js',
    manifest: '/manifest.json',
    keywords: ['productivity', 'task management', 'habits', 'gamification', 'PWA'],
    authors: [
        { name: 'UFFICIENT Team' },
    ],
    icons: [
        { rel: 'apple-touch-icon', url: '/icons/icon-128x128.png' },
        { rel: 'icon', url: '/icons/icon-128x128.png' },
    ],
};

export const viewport: Viewport = {
    minimumScale: 1,
    initialScale: 1,
    width: 'device-width',
    shrinkToFit: false,
    viewportFit: 'cover',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#6C00FF' },
        { media: '(prefers-color-scheme: dark)', color: '#29006E' },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta name="application-name" content="UFFICIENT Mobile" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="UFFICIENT" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-config" content="/icons/browserconfig.xml" />
                <meta name="msapplication-TileColor" content="#6C00FF" />
                <meta name="msapplication-tap-highlight" content="no" />

                <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="shortcut icon" href="/favicon.ico" />
            </head>
            <body className="font-inter antialiased">
                <div id="root">
                    {children}
                </div>
            </body>
        </html>
    );
}
