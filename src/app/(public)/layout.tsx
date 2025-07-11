import type { PropsWithChildren } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { domAnimation, LazyMotion } from "framer-motion";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div>
      <LazyMotion features={domAnimation}>
        <Navbar />
        <div>{children}</div>
        <Footer />
      </LazyMotion>
    </div>
  );
}
