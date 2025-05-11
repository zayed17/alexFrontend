import Image from "next/image";
import React from "react";

interface PropertyProps {
  imageSrc: string;
  imageAlt: string;
  height?: string;
}

function LuxuryProperties({ imageSrc, imageAlt, height = "h-[50vh] md:h-[70vh] lg:h-[70vh]" }: PropertyProps) {
  return (
    <div>
      <section className={`relative w-full ${height}`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
        />
      </section>
    </div>
  );
}

export default LuxuryProperties;
