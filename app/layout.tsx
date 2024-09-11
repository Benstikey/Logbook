import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Logbook",
  description: "Keep track of your life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang='en'>
          <body>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
            </SignedIn>
            {children}
          </body>
        </html>
      </ClerkProvider>
  );
}