import Image from "next/image";
import Link from "next/link";

export default function MeetTheTeam({agents}: any) {
  const teamMembers = [
    {
      name: "Viktoria Reah",
      title: "Senior VP Tier 4 Investment Consultant",
      image: "/images/user/user-31.png",
    },
    {
      name: "Thomas Paul",
      title: "Senior Off Plan & Investment Consultant",
      image: "/images/user/user-31.png",
    },
    {
      name: "John Callum",
      title: "Senior VP Tier 4 Investment Consultant",
      image: "/images/user/user-31.png",
    },
    {
      name: "Sara Davies",
      title: "Senior Off Plan & Investment Consultant",
      image: "/images/user/user-31.png",
    },
  ];

  return (
    <div className="w-full bg-[#F5F6F7]">
      <div className="relative pb-20 sm:pb-24 md:pb-28 lg:pb-32">
        {/* Background split */}
        <div className="absolute left-0 right-0 top-0 h-1/2 bg-[#F5F6F7]" />
        <div className="absolute bottom-0 left-0 right-0 h-[43%] bg-white" />

        {/* Content container */}
        <div className="relative mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20 md:pt-24 lg:px-8 lg:pt-28">
          {/* Heading section */}
          <div className="mb-8 sm:mb-10 md:mb-12 text-center">
            <h2 className="mb-3 sm:mb-4 md:mb-6 text-2xl sm:text-3xl font-light text-gray-900 font-presto">
              Meet the Team
            </h2>
            <p className="mx-auto max-w-2xl text-xs sm:text-sm leading-relaxed text-gray-600">
              Customer service is close to our hearts. Each PRO line member
              lives and breathes our values and practices our culture each and
              every day. We hand select the best of the best - those rare
              diamonds that will go the extra mile for our clients.
            </p>
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {agents?.map((member:any, index:number) => (
              <div key={index} className="flex flex-col items-center">
                {member.roiPercentage && member.yearlyPercentage ? (
                  <Link href={`/agent/${member._id}`} className="group relative mb-4">
                    <div className="relative h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={member.profileImage}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="relative mb-4">
                    <div className="relative h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 overflow-hidden rounded-full">
                      <Image
                        src={member.profileImage}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              
                {/* Profile text */}
                <div className="text-center">
                  <h3 className="mb-1 text-base sm:text-lg font-medium text-gray-900 font-presto">
                    {member.name}
                  </h3>
                  <p className="mb-4 text-xs text-gray-600">{member.role}</p>
                </div>
              </div>
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}