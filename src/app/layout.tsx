import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Supabase Postgresql CRUD",
  description: "Created by Trae Zeeofor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-trebuchetMs">
        {children}
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
