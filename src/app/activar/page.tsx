import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ActivarFlow from "./ActivarFlow";

export const metadata: Metadata = {
  title: "Activá tu software — Onvision",
  description:
    "Elegí tu industria y tu plan. Creás tu cuenta y empezás a operar el mismo día, con 15 días gratis.",
};

export default function ActivarPage() {
  return (
    <>
      <Navbar />
      <main className="bg-ov-surface min-h-screen pt-28 pb-24">
        <Suspense fallback={null}>
          <ActivarFlow />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
