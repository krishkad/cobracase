import mongoose, { model, models } from "mongoose";
import { string } from "zod";

const imageSchema = new mongoose.Schema({
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
    configured_image_width: {
        type: Number,
    },
    configured_image_height: {
        type: Number,
    },
}, {
    timestamps: true
});

const Image = models.images || model('images', imageSchema);
export default Image;