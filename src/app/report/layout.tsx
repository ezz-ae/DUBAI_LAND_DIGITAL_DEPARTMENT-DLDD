import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'DLDCHAIN Report',
  description: 'Generated report for the DLDCHAIN Project.',
};

export default function ReportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <main className="max-w-4xl mx-auto p-8 prose prose-lg">{children}</main>
      </body>
    </html>
  );
}
