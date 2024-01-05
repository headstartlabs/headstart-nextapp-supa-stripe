"use client";
import { useState } from "react";
import Button from "@/components/pricing/button";
import { Database } from "@/types/TSupabaseDatabase";
import { postData } from "@/utils/helpers";
import { getStripe } from "@/utils/stripe/client";
import { Session, User } from "@supabase/supabase-js";
import Link from "next/link";

import { useRouter } from "next/navigation";

import PageLayout from "../layouts/page-layout";
import { createCheckoutSession } from "@/actions/stripe/create-checkout-session";

type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];
type Price = Database["public"]["Tables"]["prices"]["Row"];

interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = "lifetime" | "year" | "month";

export default function Pricing({
  session,
  user,
  products,
  subscription,
}: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push("/sign-in");
    }
    if (subscription) {
      return router.push("/account");
    }
    try {
      const sessionId = await createCheckoutSession(price);

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  if (!products.length)
    return (
      <PageLayout>
        <div>
          <Link href="/" className="inline-block">
            <button className="group text-primary font-semibold text-md border-b text-blue-500 hover:bg-blue-500 hover:text-blue-50 focus:outline-none focus:ring focus:ring-blue-300 backdrop-blur-2xl w-auto rounded-md border border-blue-500 px-4 py-1">
              back
            </button>
          </Link>
        </div>
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{" "}
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
      </PageLayout>
    );

  if (products.length === 1)
    return (
      <PageLayout>
        <div>
          <Link href="/" className="inline-block">
            <button className="group text-primary font-semibold text-md border-b text-blue-500 hover:bg-blue-500 hover:text-blue-50 focus:outline-none focus:ring focus:ring-blue-300 backdrop-blur-2xl w-auto rounded-md border border-blue-500 px-4 py-1">
              back
            </button>
          </Link>
        </div>
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-4xl font-extrabold sm:text-center sm:text-6xl text-blue-600">
              Pricing Plans
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-xl sm:text-center sm:text-2xl">
              Start building for free, then add a site plan to go live. Account
              plans unlock additional features.
            </p>
            <div className="relative flex self-center mt-12 border rounded-lg">
              <div className="border border-opacity-50 divide-y rounded-lg shadow-sm border-blue-300 bg-blue-500">
                <div className="p-6 py-2 m-1 text-2xl font-medium text-white rounded-md shadow-sm border-blue-800 whitespace-nowrap focus:outline-none  focus:z-10 sm:w-auto sm:px-8">
                  {products[0].name}
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4 sm:mt-12 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3 text-white">
              {products[0].prices?.map((price) => {
                const priceString =
                  price.unit_amount &&
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: price.currency!,
                    minimumFractionDigits: 0,
                  }).format(price.unit_amount / 100);

                return (
                  <div
                    key={price.interval}
                    className="divide-y rounded-lg shadow-sm divide-blue-600 bg-blue-600"
                  >
                    <div className="p-6">
                      <p>
                        <span className="text-5xl font-extrabold white">
                          {priceString}
                        </span>
                        <span className="text-base font-medium text-blue-100">
                          /{price.interval}
                        </span>
                      </p>
                      <p className="mt-4 text-blue-300">{price.description}</p>
                      <div className="flex justify-center pt-4">
                        <Button
                          variant="slim"
                          disabled={false}
                          active={!!session}
                          loading={priceIdLoading === price.id}
                          onClick={() => handleCheckout(price)}
                        >
                          {products[0].name ===
                          subscription?.prices?.products?.name
                            ? "Manage"
                            : "Subscribe"}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PageLayout>
    );

  return (
    <PageLayout>
      <div>
        <Link href="/" className="inline-block">
          <button className="group text-primary font-semibold text-md border-b text-blue-500 hover:bg-blue-500 hover:text-blue-50 focus:outline-none focus:ring focus:ring-blue-300 backdrop-blur-2xl w-auto rounded-md border border-blue-500 px-4 py-1">
            back
          </button>
        </Link>
      </div>
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold sm:text-center sm:text-6xl text-blue-600">
            Pricing Plans
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl sm:text-center sm:text-2xl">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
          </p>
          <div className="relative self-center mt-6 rounded-lg p-0.5 flex sm:mt-8 border-2 border-blue-300 bg-blue-100">
            {intervals.includes("month") && (
              <button
                onClick={() => setBillingInterval("month")}
                type="button"
                className={`${
                  billingInterval === "month"
                    ? "relative w-1/2 bg-blue-700 border-blue-800 shadow-sm text-white"
                    : "ml-0.5 relative w-1/2 border border-transparent text-blue-400"
                } rounded-md m-1 py-2 text-sm font-bold whitespace-nowrap focus:outline-none focus:ring-2 focus:z-10 sm:w-auto sm:px-8 `}
              >
                Monthly billing
              </button>
            )}
            {intervals.includes("year") && (
              <button
                onClick={() => setBillingInterval("year")}
                type="button"
                className={`${
                  billingInterval === "year"
                    ? "relative w-1/2 bg-blue-700 border-blue-800 shadow-sm text-white"
                    : "ml-0.5 relative w-1/2 border border-transparent text-blue-400"
                } rounded-md m-1 py-2 text-sm font-bold whitespace-nowrap focus:outline-none focus:ring-2 focus:z-10 sm:w-auto sm:px-8`}
              >
                Yearly billing
              </button>
            )}
          </div>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);
            return (
              <div
                key={product.id}
                className={"rounded-lg shadow-sm divide-y bg-blue-600"}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 text-white">
                    {product.name}
                  </h2>
                  <p className="mt-4 text-blue-300">{product.description}</p>
                  <p className="mt-8">
                    <span className="text-5xl font-extrabold text-white">
                      {priceString}
                    </span>
                    <span className="text-base font-medium text-blue-100">
                      /{billingInterval}
                    </span>
                  </p>
                  <div className="flex justify-center pt-4">
                    <Button
                      variant="slim"
                      disabled={!session}
                      active={!session}
                      loading={priceIdLoading === price.id}
                      onClick={() => handleCheckout(price)}
                    >
                      {subscription ? "Manage" : "Subscribe"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
