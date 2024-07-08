"use client";

import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import { SidebarPartners } from "@/containers/partners/SidebarPartners";
import { useAuth } from "@/hooks/useAuth";

export default function Loading() {
  const { role } = useAuth();
  console.log(role);
  return role === 1 ? (
    <>
      <Header />
      <h1>Loading...</h1>
      <Footer />
    </>
  ) : (
    <div className="grid min-h-screen w-full grid-cols-6 grid-rows-10 bg-background">
      <SidebarPartners />
      <div className="col-span-5 col-start-2 row-span-8 max-lg:col-start-1">
        loading...
      </div>
    </div>
  );
}
