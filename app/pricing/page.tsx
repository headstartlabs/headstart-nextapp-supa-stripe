import Pricing from "@/components/pricing/pricing";

import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices,
} from "@/actions/supabase/server-get";

export default async function PricingPage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription(),
  ]);

  return (
    <Pricing
      session={session}
      user={session?.user}
      products={products}
      subscription={subscription}
    />
  );
}
