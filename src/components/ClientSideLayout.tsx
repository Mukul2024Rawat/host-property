"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

interface ClientSideLayoutProps {
  children: React.ReactNode;
}

const ClientSideLayout: React.FC<ClientSideLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const hideNavbarFooter =
    pathname.startsWith("/host/dashboard") ||
    pathname.startsWith("/user/dashboard") ||
    pathname.startsWith("/host") ||
    pathname.startsWith("/become-a-host");

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      {children}
      {!hideNavbarFooter && <Footer />}
    </>
  );
};

export default ClientSideLayout;
