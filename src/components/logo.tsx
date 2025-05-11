// import darkLogo from "@/assets/logos/dark.svg";
// import logo from "@/assets/logos/main.svg";
// import { mainLogo } from "@/constants/images";
// import Image from "next/image";

// export function Logo() {
//   return (
//     <div className="relative h-12 max-w-[10.847rem]">
//       <Image
//         src={mainLogo}
//         fill
//         className="dark:hidden"
//         alt="NextAdmin logo"
//         role="presentation"
//         quality={100}
//       />

//       <Image
//         src={mainLogo}
//         fill
//         className="hidden dark:block"
//         alt="NextAdmin logo"
//         role="presentation"
//         quality={100}
//       />
//     </div>
//   );
// }


"use client";

import { mainLogo, mainLogoBlack } from "@/constants/images";
import { useTheme } from "next-themes"; // Make sure you have next-themes installed
import Image from "next/image";
import { useEffect, useState } from "react";

export function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Avoid hydration mismatch by rendering after component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder during SSR
    return <div className="h-10 w-32" />;
  }

  return (
    <div className="h-10">
      <Image
        src={theme === 'dark' ? mainLogo : mainLogoBlack}
        alt="Logo"
        width={130}
        height={40}
        priority
      />
    </div>
  );
}