import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Quiz Platform',
  description: 'Create and take quizzes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <nav>
            <a href="/">Dashboard</a> 
          </nav>
        </header>
        <main style={{ padding: '1rem' }}>{children}</main>
      </body>
    </html>
  );
}
