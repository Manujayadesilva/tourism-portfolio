import React from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = "Heshan | Travel & Marketing" }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Explore travel marketing, promote businesses, and discover Sri Lanka's best with Heshan." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-white text-gray-800">
        {children}
      </main>
    </>
  );
}
