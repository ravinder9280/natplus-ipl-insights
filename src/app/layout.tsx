import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
    subsets: ["latin"],
  
});
;

export const metadata: Metadata = {
  title: "IPL-Insights-RAVINDER",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className}   antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
