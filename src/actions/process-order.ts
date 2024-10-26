"use server";

import { ConnectToDatabase } from "@/database/db";
import Case from "@/database/models/case";
import Order from "@/database/models/order";
import User from "@/database/models/user";
import { options } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { FINISHES, MATERIALS } from "@/validators/option-validator";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

export const processOrder = async ({ configId }: { configId: string }) => {
    try {
        if (!configId) throw new Error("process order error: configId not found");
        await ConnectToDatabase();

        const {
            _id,
            preview_image,
            material,
            finish,
            casePrice
        } = await Case.findById(configId);

        const materialPrice = MATERIALS.options.find((mat) => mat.value === material)?.price;
        const finishPrice = FINISHES.options.find((fin) => fin.value === finish)?.price;
        const totalPrice = casePrice + materialPrice + finishPrice;

        const session = await getServerSession(options);

        if (!session?.user) throw new Error("process order error: user not found");

        const product = await stripe.products.create({
            name: "Your IPhone Case",
            images: [preview_image],
            default_price_data: {
                currency: 'USD',
                unit_amount: totalPrice * 100
            }

        });

        const user = await User.findById(session.user?.id);

        if (!user) throw new Error("user not found");

        const placeOrder = await Order.create({
            userId: user._id,
            caseId: _id,
            price: parseInt(totalPrice),
            totalAmount: parseInt(totalPrice),
        });

        if (!placeOrder) throw new Error("failed to create Order");

        const sessionParams: Stripe.Checkout.SessionCreateParams = {
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?id=${placeOrder._id}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${_id}`,
            payment_method_types: ['card'],
            mode: 'payment',
            shipping_address_collection: { allowed_countries: ['IN', 'US', 'DE'] },
            metadata: {
                userId: session.user?.id,
                caseId: _id.toString(),
                orderId: placeOrder._id.toString()
            },
            line_items: [{ price: product.default_price as string, quantity: 1 }],
        };


        const stripeSession = await stripe.checkout.sessions.create(sessionParams);




        return { url: stripeSession.url };

    } catch (error: any) {
        console.log("process order error: ", error.message);
        throw new Error("process order error: ", error.message);
    };
};