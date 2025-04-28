import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import CollapsibleSection from "@/components/CollapsibleSection";
import TruncatedSection from "@/components/TruncatedSection";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from "react";

interface Plan {
  name: string;
  discountedPrice: number;
  originalPrice: number;
  duration: string;
  isAvailable: boolean;
  benefits: string[];
  activationInfo: string;
}

interface SubscriptionPlan {
  _id: string;
  brandName: string;
  brandLogo: any;
  backgroundPhoto: any;
  slug: { current: string };
  discountInfo: { maxDiscountPercentage: number; discountCode?: string };
  plans: Plan[];
  platformSummary: string;
  benefits: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  termsAndConditions: string[];
  content: any[];
}

async function fetchSubscriptionPlan(slug: string) {
  const query = `*[_type == "subscriptionPlan" && slug.current == $slug][0] {
    _id,
    brandName,
    brandLogo,
    backgroundPhoto,
    slug,
    discountInfo,
    plans,
    platformSummary,
    benefits,
    faqs,
    termsAndConditions,
    content
  }`;
  try {
    const result = await client.fetch(query, { slug, _cacheBuster: Date.now() });
    console.log("Full fetched subscription plan:", JSON.stringify(result, null, 2));
    console.log("Plans array:", result.plans);
    return result;
  } catch (error) {
    console.error("Error fetching subscription plan:", error);
    return null;
  }
}

export default async function SubscriptionPage({
  params,
}: {
  params: { slug: string };
}) {
  const subscription = await fetchSubscriptionPlan(params.slug);

  if (!subscription) {
    return <div>Subscription plan not found.</div>;
  }

  const { brandName, brandLogo, backgroundPhoto, plans, discountInfo, platformSummary, benefits, faqs, termsAndConditions } = subscription;

  const logoUrl = brandLogo && brandLogo.asset ? urlFor(brandLogo).url() : "";
  const backgroundUrl = backgroundPhoto && backgroundPhoto.asset ? urlFor(backgroundPhoto).url() : "";

  if (!plans || plans.length === 0) {
    return <div>No plans available.</div>;
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Logo and Background */}
        <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
          {backgroundUrl && (
            <Image
              src={backgroundUrl}
              alt={`${brandName} Background`}
              fill
              className="object-cover"
            />
          )}
          {logoUrl && (
            <div className="absolute top-4 left-4 bg-gray-900 p-2 rounded-full">
              <Image
                src={logoUrl}
                alt={`${brandName} Logo`}
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
          )}
        </div>

        {/* Discount Banner */}
        {discountInfo.maxDiscountPercentage > 0 && (
          <div className="flex items-center justify-center bg-yellow-500 text-black font-bold py-2 mb-6 rounded-lg">
            Get {discountInfo.maxDiscountPercentage}% Off
            <span className="ml-2">💰</span>
          </div>
        )}

        {/* Plan Details - Show All Plans */}
        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">{brandName}</h2>
          {plans.map((plan: { isAvailable: any; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined; duration: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined; benefits: (string | number | boolean | ReactPortal | PromiseLikeOfReactNode | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined)[]; activationInfo: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined; discountedPrice: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined; originalPrice: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined; }, index: Key | null | undefined) => (
            <div
              key={index}
              className={`p-4 rounded-lg mb-4 ${
                plan.isAvailable ? "bg-gray-800" : "bg-gray-700 opacity-75"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium mb-1">{plan.name}</h3>
                  <p className="text-sm mb-2 text-gray-400">{plan.duration}</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {plan.benefits.map((benefit: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined, benefitIndex: Key | null | undefined) => (
                      <li key={benefitIndex} className="text-gray-300">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm mt-2 text-blue-400">{plan.activationInfo}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">₹{plan.discountedPrice}</p>
                  <p className="text-sm line-through text-gray-400">
                    ₹{plan.originalPrice}
                  </p>
                  <button
                    className={`mt-4 px-4 py-2 rounded-lg ${
                      plan.isAvailable
                        ? "bg-teal-500 text-white hover:bg-teal-600"
                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!plan.isAvailable}
                  >
                    {plan.isAvailable ? "Buy Now" : "Not Available"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overview - With Truncation, No Dropdown */}
        <TruncatedSection title="Overview" content={platformSummary} truncateLength={100} />

        {/* Benefits - Dropdown Without Truncation */}
        <CollapsibleSection title="Benefits with Fleek">
          <ul className="list-disc list-inside text-sm space-y-1">
            {benefits.map((benefit: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined; }, index: Key | null | undefined) => (
              <li key={index}>
                <span className="font-semibold">{benefit.title}</span>:{" "}
                {benefit.description}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        {/* FAQs - Dropdown Without Truncation */}
        <CollapsibleSection title="FAQs">
          {faqs.map((faq: { question: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined; answer: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined; }, index: Key | null | undefined) => (
            <div key={index} className="mb-4">
              <h4 className="text-md font-semibold">{faq.question}</h4>
              <p className="text-sm">{faq.answer}</p>
            </div>
          ))}
        </CollapsibleSection>

        {/* Terms and Conditions - With Truncation, No Dropdown */}
        <TruncatedSection
          title="Terms & Conditions"
          content={termsAndConditions.join(" ")}
          truncateLength={100}
        />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const query = `*[_type == "subscriptionPlan"] {
    slug
  }`;
  try {
    const subscriptions = await client.fetch(query);
    console.log("Subscriptions for static params:", subscriptions);
    return subscriptions.map((subscription: { slug: { current: any; }; }) => ({
      slug: subscription.slug.current,
    }));
  } catch (error) {
    console.error("Error fetching subscriptions for static params:", error);
    return [];
  }
}