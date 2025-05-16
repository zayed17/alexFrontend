import type { PropsWithChildren } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}