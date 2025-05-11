import Image from "next/image";
import React from "react";

function LuxuryProperties() {
  return (
    <div>
      <section className="relative h-[50vh] w-full md:h-[70vh] lg:h-[70vh] ">
        <Image
          src="/images/dubaiharbour/sec-1.png"
          alt="Dubai Creek Harbour panoramic view with a resident enjoying the sunset from a luxury apartment balcony"
          fill
          priority
          className="object-cover"
        />
      </section>
    </div>
  );
}

export default LuxuryProperties;
