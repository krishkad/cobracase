import Stripe from 'stripe';


if(!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY not fround");

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string ?? "", {
    apiVersion: "2024-09-30.acacia",
    typescript: true
});