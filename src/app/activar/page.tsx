import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ActivarFlow from "./ActivarFlow";

export const metadata: Metadata = {
  title: "Activá tu software — Onvision",
  description:
    "Elegí tu industria, pagá con tarjeta (₡10,500/mes en CRC) y creá tu cuenta el mismo día.",
};

export default function ActivarPage() {
  return (
    <>
      <Navbar />
      <main className="hero-surface min-h-screen pt-28 pb-24">
        <Suspense fallback={null}>
          <ActivarFlow />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
