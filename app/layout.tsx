import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Telefonarnet | Londrina merecia mais velocidade',
  description: 'Planos 100% fibra com streamings inclusos.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans bg-[#0a0f1a] text-white antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
