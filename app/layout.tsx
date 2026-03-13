import type {Metadata} from 'next';
import {Inter, Plus_Jakarta_Sans} from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-display',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Telefonarnet | Londrina merecia mais velocidade',
  description: 'Planos 100% fibra com streamings inclusos.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${plusJakartaSans.variable} font-sans bg-[#0a0f1a] text-white antialiased`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
