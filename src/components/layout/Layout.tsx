import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  withFooter?: boolean;
}

export function Layout({ children, withFooter = true }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {withFooter && <Footer />}
    </div>
  );
}
