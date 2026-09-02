import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import ChatWidget from "@/components/chat/ChatWidget";

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-white font-body overflow-x-hidden">
      <ScrollToTop />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
