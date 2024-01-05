'use server'
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";
import { stripe } from '@/utils/stripe/server';
import { createOrRetrieveCustomer } from '@/utils/supabase/supabase-admin';
import { getURL } from '@/utils/helpers';

export async function createCheckoutSession(price: any): Promise<string> {
  // 1. Destructure the price and quantity from the POST body
  const quantity = 1, metadata = {} 

  try {
    // 2. Get the user from Supabase auth
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user }
    } = await supabase.auth.getUser();

    // 3. Retrieve or create the customer in Stripe
    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || '',
      email: user?.email || ''
    });

    // 4. Create a checkout session in Stripe
    let session;
    if (price.type === 'recurring') {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        customer,
        customer_update: {
          address: 'auto'
        },
        line_items: [
          {
            price: price.id,
            quantity
          }
        ],
        mode: 'subscription',
        allow_promotion_codes: true,
        subscription_data: {
          metadata
        },
        success_url: `${getURL()}/account`,
        cancel_url: `${getURL()}/`
      });
    } else if (price.type === 'one_time') {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        customer,
        customer_update: {
          address: 'auto'
        },
        line_items: [
          {
            price: price.id,
            quantity
          }
        ],
        mode: 'payment',
        allow_promotion_codes: true,
        success_url: `${getURL()}/account`,
        cancel_url: `${getURL()}/`
      });
    }

    if (session) {
      return session.id ;
    } else {
      throw new Error('Session is not defined');
    }
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
}
