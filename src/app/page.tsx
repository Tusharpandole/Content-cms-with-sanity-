
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import PlanCard from "@/components/PlanCard";
import SubscriptionSlider from "@/components/Slider";

interface Plan {
  name: string;
  discountedPrice: number;
  duration: string;
  isAvailable: boolean;
}

interface SubscriptionPlan {
  backgroundPhoto: any;
  brandName: string;
  brandLogo: any;
  slug: string;
  discountInfo: {
    maxDiscountPercentage: number;
    discountCode?: string;
  };
  plans: Plan[];
}

interface ImageSlider {
  slides: any[]; // Array of images
}

async function fetchWithRetry(client: any, query: string, params = {}, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await client.fetch(query, params);
    } catch (error) {
      if (attempt === retries) throw error;
      if (error instanceof Error) {
        console.log(`Retry ${attempt}/${retries} failed:`, error.message);
      } else {
        console.log(`Retry ${attempt}/${retries} failed with an unknown error.`);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
}

export const revalidate = 60; // seconds

export default async function Home() {
  const subscriptionQuery = `*[_type == 'subscriptionPlan' && !(_id in path('drafts.**'))] {
    backgroundPhoto,
    brandName,
    brandLogo,
    "slug": slug.current,
    discountInfo,
    plans[] | order(discountedPrice asc) {
      name,
      discountedPrice,
      duration,
      isAvailable
    }
  }`;

  const sliderQuery = `*[_type == 'imageSlider'][0] {
    slides
  }`;

  let subscriptionPlans: SubscriptionPlan[] = [];
  let imageSlider: ImageSlider | null = null;

  try {
    [subscriptionPlans, imageSlider] = await Promise.all([
      fetchWithRetry(client, subscriptionQuery),
      fetchWithRetry(client, sliderQuery),
    ]);
    console.log("Fetched subscription plans:", subscriptionPlans);
    console.log("Fetched image slider:", imageSlider);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return (
      <main className="flex min-h-screen flex-col bg-black text-white p-4">
        <h1 className="text-2xl font-bold uppercase my-12 text-center text-teal-400 sm:text-3xl lg:text-5xl">
          Subscription Plans
        </h1>
        <p className="text-center text-red-500">
          Failed to load data. Please check your network or try again later.
        </p>
      </main>
    );
  }

  if (!subscriptionPlans || subscriptionPlans.length === 0) {
    return (
      <main className="flex min-h-screen flex-col bg-black text-white p-4">
        <h1 className="text-2xl font-bold uppercase my-12 text-center text-teal-400 sm:text-3xl lg:text-5xl">
          Subscription Plans
        </h1>
        <p className="text-center">No subscription plans found.</p>
      </main>
    );
  }

  // Prepare images for the slider from imageSlider
  const sliderImages = imageSlider?.slides || [];

  return (
    <main className="flex min-h-screen flex-col bg-black text-white p-4">
     
      {/* Add the Slider Below the Navbar */}
      {sliderImages.length > 0 ? (
        <SubscriptionSlider images={sliderImages} />
      ) : (
        <p className="text-center text-gray-500 mb-12">No images available for the slider.</p>
      )}

      {/* Existing Plan Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subscriptionPlans.map((subscription: SubscriptionPlan, index: number) => {
          const activePlan = subscription.plans.find(
            (plan: Plan) => plan.isAvailable
          ) || subscription.plans[0]; // Fallback to first plan if none are active

          return (
            <PlanCard
              key={index}
              backgroundPhoto={subscription.backgroundPhoto}
              brandName={subscription.brandName}
              brandLogo={subscription.brandLogo}
              slug={subscription.slug}
              discountPercentage={
                subscription.discountInfo?.maxDiscountPercentage || 0
              }
              plan={activePlan}
            />
          );
        })}
      </section>
    </main>
  );
}
