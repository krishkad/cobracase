import mongoose, { model, models } from "mongoose";

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
    }
}, {
    timestamps: true
});

const Image = models.images || model('images', imageSchema);
export default Image;