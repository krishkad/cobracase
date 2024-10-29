import mongoose, { model, models } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "user"
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    signUpOrigin: {
        type: String,
        enum: ["github", "google", "cobracase"]
    }
}, {
    timestamps: true
})

const User = models.users || model('users', userSchema);

export default User;