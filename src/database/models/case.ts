import { COLORS } from "@/validators/option-validator";
import mongoose, { model, models } from "mongoose";
import { string } from "zod";

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