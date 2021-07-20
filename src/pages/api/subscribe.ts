import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { query as q } from 'faunadb';


import { stripe } from "../../services/stripe";
import { fauna } from "../../services/fauna";

type User = {
    ref: {
        id: string;
    }
    data: {
        stripe_customer_id: string
    }
}


//cookies: disponível tanto no front quando to back
//localstorage: apenas backend
export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === "POST") {

        const session = await getSession({ req });//pegando dados do usuário pelos cookies

        //Buscando Usuário por email
        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        );

        //Pegando StripeId de User do Fauna
        let customerId = user.data.stripe_customer_id;

        if (!customerId) {
            //Criando Usuário no stripe
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email,
                //metadata
            });

            //Jogando o StripeId no Fauna DB
            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),//não da pra fazer pelo indice => apenas pela ref
                    {
                        data: {
                            stripe_customer_id: stripeCustomer.id,
                        }
                    }
                )
            )

            customerId = stripeCustomer.id;
        }

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1JCSzFA94xj7frFYyVEanUTC', quantity: 1 }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        });

        return res.status(200).json({ sessionId: stripeCheckoutSession.id });

    } else {
        res.setHeader('Allow', "POST");
        res.status(405).end('Method now allowed');
    }



}