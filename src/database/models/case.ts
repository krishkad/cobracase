import mongoose, { model, models, Types } from "mongoose";

export interface ICase extends Document {
    _id: Types.ObjectId;  // Add the Mongoose ObjectId type for the _id field
    imageUrl: string;
    width?: number;
    height?: number;
    configured_image?: string;
    configured_image_width?: number;
    configured_image_height?: number;
    preview_image?: string,
    color?: string;
    model?: string;
    material?: string;
    finish?: string;
    casePrice?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
const caseSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    configured_image: {
        type: String,
    },
    preview_image: {
        type: String
    },
    configured_image_width: {
        type: Number,
    },
    configured_image_height: {
        type: Number,
    },
    color: {
        type: String
    },
    model: {
        type: String
    },
    material: {
        type: String
    },
    finish: {
        type: String
    },
    casePrice: {
        type: Number
    }
}, {
    timestamps: true
});



const Case = models.cases || model('cases', caseSchema);
export default Case;