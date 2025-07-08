import { Oswald, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ['latin'], 
  weight: ['200', '300', '500'], 
  variable: '--font-oswald', 
  display: 'swap', 
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
