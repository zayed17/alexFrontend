import type { PropsWithChildren } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings Page",
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
