import { model, models, Schema, Types } from "mongoose";


// Define the interface for the shipping address
interface IShippingAddress {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
};

// Define the TypeScript interface for the Order document
export interface IOrder extends Document {
    _id: Types.ObjectId; // Reference to User
    userId: Types.ObjectId; // Reference to User
    caseId: Types.ObjectId; // Reference to Case
    quantity?: number;
    price: number;
    totalAmount: number;
    shippingAddress?: IShippingAddress;
    paymentStatus: 'Pending' | 'Completed' | 'Failed';
    orderStatus: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    createdAt?: Date; // Optional, handled by Mongoose timestamps
    updatedAt?: Date; // Optional, handled by Mongoose timestamps
};


const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    caseId: {
        type: Schema.Types.ObjectId,
        ref: 'cases',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        postalCode: {
            type: String,
        },
        country: {
            type: String,
        }
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    orderStatus: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing'
    },
}, {
    timestamps: true
});

const Order = models?.orders || model('orders', orderSchema);
export default Order;

