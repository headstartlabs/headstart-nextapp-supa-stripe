import * as React from "react";
import PageLayout from "@/components/layouts/page-layout";
import Link from "next/link";

type PricingCardProps = {
  title: string;
  description: string;
  price: string;
  link: string;
};
const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  link,
}) => {
  return (
    <div className="flex-shrink-0 w-full sm:w-1/2 p-4">
      <div className="bg-white p-12 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-500">{price}</span>
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <button className="group text-primary font-semibold text-md border-b text-blue-50 bg-blue-500 hover:bg-blue-600 hover:text-blue-50 focus:outline-none focus:ring focus:ring-blue-300 backdrop-blur-2xl w-auto rounded-md border px-4 py-1">
              Pay Here
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function PricingPage() {
  return (
    <PageLayout>
      <div>
        <Link href="/" className="inline-block">
          <button className="group text-primary font-semibold text-md border-b text-blue-500 hover:bg-blue-500 hover:text-blue-50 focus:outline-none focus:ring focus:ring-blue-300 backdrop-blur-2xl w-auto rounded-md border border-blue-500 px-4 py-1">
            back
          </button>
        </Link>
      </div>
      <h2 className={`mb-3 text-2xl font-semibold`}>Stripe Payment Links</h2>
      <div className="flex flex-wrap justify-center mt-8">
        <PricingCard
          title="Donate"
          description="An token of appreciation."
          price="A$0"
          link={process.env.STRIPE_PAYMENT_LINK_FREE!}
        />
      </div>
    </PageLayout>
  );
}
