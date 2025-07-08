import { Oswald, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuroraBackground } from '@/components/ui/aurora-background'

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
      <body>
        <div className="relative w-full h-screen overflow-hidden">
          <AuroraBackground className="absolute inset-0 z-0" />
          <div className="relative z-10 w-full h-full overflow-y-auto">
            {children}
          </div>
        </div>
        
      </body>
    </html>
  );
}
