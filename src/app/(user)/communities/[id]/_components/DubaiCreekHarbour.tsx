import Image from "next/image"
import Link from "next/link"

interface DubaiCreekHarbourProps {
  title: string
  description: string
  mainImage: string
}

function DubaiCreekHarbour({ title, description, mainImage }: DubaiCreekHarbourProps) {
  // Split description into paragraphs if it contains newlines
  const paragraphs = description?.split("\n").filter((p) => p.trim() !== "")

  // Default paragraphs if none are provided
  const defaultParagraphs = [
    "Experience a unique waterfront enclave where contemporary luxury, serene nature, and innovation come together. It features iconic amenities like the Dubai Creek Marina, a haven for yachting enthusiasts, and close proximity to the Ras Al Khor Wildlife Sanctuary, renowned for its rich biodiversity, including flamingos. The sanctuary's tranquil lagoons offer a perfect setting for nature walks and birdwatching.",
    "Dubai Creek Harbour offers easy access to landmarks such as Downtown Dubai and Dubai International Airport. With picturesque promenades, world-class dining, schools, healthcare facilities, and the upcoming Dubai Metro expansion, the community is poised as a prime destination for both living and investment.",
  ]


  // Use provided paragraphs or default ones
  const displayParagraphs = paragraphs.length > 0 ? paragraphs : defaultParagraphs

  return (
    <div>
      <section className="containers mx-auto !pt-30 md:py-15 ">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <h1 className="font-serif text-3xl text-gray-900 md:text-4xl lg:text-5xl">{title}</h1>
          </div>
          <div className="md:col-span-8">
            <div className="space-y-4 text-gray-700 pb-2">
              {displayParagraphs.map((paragraph:any, index:number) => (
                <p key={index} className="leading-relaxed text-sm sm:text-base md:text-base lg:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full">
        <div className="aspect-video w-full sm:aspect-[16/9] md:aspect-[21/8] lg:aspect-[21/8]">
          <Image
            src={mainImage}
            alt={`${title} panoramic view with a resident enjoying the sunset from a luxury apartment balcony`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>
    </div>
  )
}

export default DubaiCreekHarbour

