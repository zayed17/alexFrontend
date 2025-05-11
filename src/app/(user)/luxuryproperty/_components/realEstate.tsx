import PropertySearch from "./PropertySearch";
import PropertyGrid from "@/components/user/propertyGrid";
import type { Property } from "@/lib/types";
interface RealEstateUIProps {
  properties: Property[];
}

export default function RealEstateUI({ properties }: RealEstateUIProps) {
  return (
    <div className="containers">
      {/* <h1 className="mb-4 text-2xl font-bold text-gray-800">
        Buy Luxury Property for Sale in Dubai & UAE
      </h1>
      <p className="mb-6 text-gray-600">
        Experience the pinnacle of luxury with buying a property in Dubai...
      </p> */}
    <section className="py-20 md:py-24">
  <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 ">
    {/* Left Column - Heading */}
    <div>
      <h1 className="font-serif text-3xl text-gray-900 md:text-4xl lg:text-4xl leading-tight">
        Buy Luxury Property for Sale in Dubai & UAE
      </h1>
    </div>

    {/* Right Column - Description */}
    <div>
      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
        Experience the pinnacle of luxury with buying a property in Dubai, where
        stunning architecture meets world-class amenities. Each residence
        seamlessly blends elegance with comfort, offering breathtaking views of
        the city skyline and pristine beaches. Buy Dubai properties and embrace
        a lifestyle defined by sophistication and unmatched beauty.
      </p>
    </div>
  </div>
</section>


      <div className="!pb-12">
      <PropertySearch />

      </div>
      <div className="">
        <PropertyGrid properties={properties} />
      </div>
    </div>
  );
}
