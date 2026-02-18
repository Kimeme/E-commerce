// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import CartProvider from "@/providers/CartProvider";
import ToasterClient from "./components/ToasterClient";
import { getCurrentUser } from "@/actions/getCurrentUser";

// import getCurrentUser from "../actions/getCurrentUser";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "E-Shop",
  description: "Ecommerce app",
};

// ✅ Async layout
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Fetch current user on server side
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        {/* Toast notifications */}
        <ToasterClient />

        <CartProvider>
          <div className="flex flex-col min-h-screen">
            {/* ✅ Pass user data to NavBar */}
            <NavBar currentUser={currentUser} />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}



