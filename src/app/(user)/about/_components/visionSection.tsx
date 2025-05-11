import Image from "next/image";

export default function VisionMissionSection() {
  return (
    <div className="w-full py-8 sm:py-12 md:py-0 lg:py-0 mb-10 md:mb-20 lg:mb-20 ">
      {/* Our Vision Section */}
      <div className="containers mx-auto mb-8 md:mb-0 flex flex-col px-4 md:flex-row md:items-center">
        {/* Left image */}
        <div className="mb-8 w-full md:mb-0 md:w-1/2">
          <div className="relative h-64 w-full sm:h-72 md:h-80 lg:h-96">
            <Image
              src="/images/dubaiharbour/card-1.png"
              alt="Luxury property plaza with fountains"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right content */}
        <div className="flex w-full  flex-col justify-center md:w-1/2 md:pl-8 lg:pl-12">
          <h2 className="mb-4 sm:mb-5 md:mb-6 text-2xl sm:text-2xl md:text-3xl font-light text-gray-900 font-presto">
            Our Vision
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            At Satina Realty, we pride ourselves on our uncompromising
            standards. Our focus on craftsmanship and detailing is a part of our
            legacy, spanning five decades. So while others may consider minor
            details to be minor, we understand how these little aspects come
            together to create an extraordinary living experience.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className=" flex flex-col-reverse md:flex-row md:items-center p-5 md:p-0 lg:p-0">
        {/* Left content */}
        <div className="flex w-full flex-col md:w-1/2 md:pr-8 lg:pr-12 justify-center items-start md:items-end pl-4 sm:pl-6 md:pl-8 lg:pl-24 mt-8 md:mt-0">
          <h2 className="mb-4 sm:mb-5 md:mb-6 text-2xl sm:text-2xl md:text-3xl font-light text-gray-900 font-presto md:text-right w-full">
            Our Mission
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 md:text-right">
            At Satina Realty, we pride ourselves on our uncompromising
            standards. Our focus on craftsmanship and detailing is a part of our
            legacy, spanning five decades. So while others may consider minor
            details to be minor, we understand how these little aspects come
            together to create an extraordinary living experience.
          </p>
        </div>

        {/* Right image */}
        <div className="mb-8 w-full md:mb-0 md:w-1/2">
          <div className="relative h-64 w-full sm:h-72 md:h-80 lg:h-96">
            <Image
              src="/images/dubaiharbour/card-1.png"
              alt="Luxury property with palm trees"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}