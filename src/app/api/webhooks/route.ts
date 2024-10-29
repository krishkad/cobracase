
import Order from '@/database/models/order';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import Stripe from 'stripe';

const resend = new Resend(process.env.STRIPE_WEBHOOKS_SECRET!);

export async function POST(req: Request) {
    try {
        const body = await req.text();
        const signature = headers().get('stripe-signature');

        if (!signature) {
            return new Response('Invalid Signature', { status: 500 })
        };

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOKS_SECRET!
        );

        if (event.type === 'checkout.session.completed') {
            if (!event.data.object.customer_details?.email) {
                return new Response("Customer Email not found.");
            }

            const session = event.data.object as Stripe.Checkout.Session;

            const { userId, orderId } = session.metadata || {
                userId: null,
                orderId: null
            };

            if (!userId || !orderId) {
                throw new Error('Invalid request metadata')
            }

            const getOrder = Order.findOneAndUpdate({ _id: orderId, userId }, {
                paymentStatus: "Completed"
            });


            console.log({ order: getOrder });


            //    await resend.emails.send({
            //         from: 'CaseCobra <hello@joshtriedcoding.com>',
            //         to: [event.data.object.cust omer_details.email],
            //         subject: 'Thanks for your order!',
            //         react: OrderReceivedEmail({
            //             orderId,
            //             orderDate: updatedOrder.createdAt.toLocaleDateString(),
            //             // @ts-ignore
            //             shippingAddress: {
            //                 name: session.customer_details!.name!,
            //                 city: shippingAddress!.city!,
            //                 country: shippingAddress!.country!,
            //                 postalCode: shippingAddress!.postal_code!,
            //                 street: shippingAddress!.line1!,
            //                 state: shippingAddress!.state,
            //             },
            //         }),
            //     })

            return NextResponse.json({
                success: true,
                message: "payment successfull"
            });


        }
    } catch (error) {
        console.log(error);
    }
}