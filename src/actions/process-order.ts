"use server";

import Case from "@/database/models/case";
import { stripe } from "@/lib/stripe";
import { FINISHES, MATERIALS } from "@/validators/option-validator";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

export const processOrder = async ({ configId }: { configId: string }) => {
    try {
        if (!configId) throw new Error("process order error: configId not found");

        const [_id, configured_image, material, finish, casePrice] = await Case.findById(configId);

        const materialPrice = MATERIALS.options.find((mat) => mat.value === material)?.price;
        const finishPrice = FINISHES.options.find((fin) => fin.value === finish)?.price;
        const totalPrice = casePrice + materialPrice + finishPrice;

        const session = await getServerSession();

        const product = await stripe.products.create({
            name: "Your IPhone Case",
            images: [configured_image],
            default_price_data: {
                currency: "USD",
                unit_amount: totalPrice
            }

        });

        const sessionParams: Stripe.Checkout.SessionCreateParams = {
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${_id}`,
            payment_method_types: ['card', 'paypal'],
            mode: 'payment',
            shipping_address_collection: { allowed_countries: ['DE', 'US'] },
            metadata: {
                userId: session!?.user.id,
                caseId: _id
            },
            line_items: [{ price: product.default_price as string, quantity: 1 }],
        }


        const stripeSession = await stripe.checkout.sessions.create(sessionParams);

        return { url: stripeSession.url };

    } catch (error: any) {
        throw new Error("process order error: ", error.message);
    }
};