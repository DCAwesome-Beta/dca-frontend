// app/layout.tsx
import '../globals.css'; // Import global styles
import { ReactNode } from 'react';
import Button from '@mui/joy/Button';
import Link from 'next/link';


export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>My App</title>
      </head>
      <body className="body-background gradient-banner">
        {/* Header */}
        <header className="header">
          <nav className="nav">
            <h1 className="nav-title">
              <a href="/home" className="nav-logo">DCAwesome</a>
            </h1>
            <div className="nav-login">
        <Link href="/signin">
            <Button variant='outlined' size="lg" color="primary" sx={{ color: 'white', borderColor: 'white', '&:hover': {
              color: '#9060FF', // Change text color to purple on hover
              borderColor: '#9060FF', // Optionally change border color to match the text
            }, }}>
              Sign In
           </Button>
        </Link>
        
    </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="main-content">
          {children}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <p className="footer-text">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
            <span className='divider'></span>
            <ul className="footer-list">
              <li><a href="/privacy" className="footer-item">Privacy Policy</a></li>
              <li><a href="/terms" className="footer-item">Terms of Service</a></li>
              <li><a href="/support" className="footer-item">Support</a></li>
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}