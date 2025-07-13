"use client";
import type { PropsWithChildren } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { domAnimation, LazyMotion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  const queryClient = new QueryClient();

  return (
    <div>
      <LazyMotion features={domAnimation}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </QueryClientProvider>
      </LazyMotion>
    </div>
  );
}
