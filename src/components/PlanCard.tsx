import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export default function PlanCard({
  backgroundPhoto,
  brandName,
  brandLogo,
  slug,
  discountPercentage,
  plan,
}: {
  backgroundPhoto: any;
  brandName: string;
  brandLogo: any;
  slug: string;
  discountPercentage: number;
  plan: any;
}) {
  const backgroundUrl = backgroundPhoto ? urlFor(backgroundPhoto).url() : "";
  const logoUrl = brandLogo ? urlFor(brandLogo).url() : "";

  return (
    <Link href={`/subscription/${slug}`} className="block">
      <section className="relative w-full h-[250px] rounded-lg overflow-hidden bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
        {/* Background Photo Section (Top 70%) */}
        <div className="relative h-[70%]">
          {backgroundUrl && (
            <Image
              src={backgroundUrl}
              alt={`${brandName} Background`}
              fill
              className="object-cover rounded-t-lg"
            />
          )}

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              UPTO {discountPercentage}% off
            </div>
          )}
        </div>

        {/* Content Section (Bottom 30%) */}
        <div className="h-[30%] bg-black flex items-center p-4 text-white">
          {/* Brand Logo */}
          {logoUrl && (
            <div className="flex-shrink-0 mr-3">
              <Image
                src={logoUrl}
                alt={`${brandName} Logo`}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          )}

          {/* Brand Name and Price/Duration */}
          <div className="flex-1 flex items-center justify-between">
            <h2 className="text-lg font-semibold mr-2">{brandName}</h2>
            <p className="text-sm">
              ₹{plan.discountedPrice}/{plan.duration}
            </p>
          </div>
        </div>
      </section>
    </Link>
  );
}