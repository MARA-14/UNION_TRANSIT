import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
