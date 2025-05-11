import "@/css/satoshi.css";
import "@/css/style.css";

import { ReactNode } from "react";
import { Providers } from "../_components/providers";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen containers items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
