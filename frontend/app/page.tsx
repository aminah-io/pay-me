'use client'
import PayMe from "@/components/PayMe";
import "./globals.css";

import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <main className="bg-slate-500 h-screen">
      <NavBar />
      <PayMe></PayMe>
    </main>
  );
}
