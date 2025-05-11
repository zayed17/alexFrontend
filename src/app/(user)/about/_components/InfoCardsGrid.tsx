import Image from "next/image";

export default function InfoCardsGrid() {
  const cards = [
    {
      title: "Investor Relations",
      description: "MR One is a Public Joint Stock Company listed on the Dubai Financial Market. View Emaar's stock market trends and related data.",
      image: "/images/infogrid/img-1.png",
      alt: "Two businesspeople reviewing documents"
    },
    {
      title: "Corporate Sustainability",
      description: "We consider sustainability to be a fundamental aspect of our lives. It is an investment in the future for both society and ourselves.",
      image: "/images/infogrid/img-3.png",
      alt: "Dubai skyline with Burj Khalifa"
    },
    {
      title: "Corporate Sustainability",
      description: "We consider sustainability to be a fundamental aspect of our lives. It is an investment in the future for both society and ourselves.",
      image: "/images/infogrid/img-2.png",
      alt: "Team hands joined together"
    }
  ];

  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card:any, index:number) => (
            <div key={index} className="bg-white shadow-sm overflow-hidden">
              {/* Card Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-light text-gray-900 mb-3 font-presto">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-700">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}