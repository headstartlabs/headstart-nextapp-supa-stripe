'use server'
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";
import { stripe } from '@/utils/stripe/server';
import { createOrRetrieveCustomer } from '@/utils/supabase/supabase-admin';
import { getURL } from '@/utils/helpers';


export async function createPortalLink() {

    try {
      const cookieStore = cookies();
      const supabase = createClient(cookieStore);
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) throw Error('Could not get user');
      const customer = await createOrRetrieveCustomer({
        uuid: user.id || '',
        email: user.email || ''
      });

      if (!customer) throw Error('Could not get customer');
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${getURL()}/account`
      });
      return { url }; 
    } catch (err: any) {
      console.log(err);
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } }),
        {
          status: 500
        }
      );
    }
  
}