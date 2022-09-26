import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
    {
        food: { type: mongoose.Types.ObjectId, ref: "foods" },
        restaurant: { type: mongoose.Types.ObjectId, ref: "restaurants" },
        user: { type: mongoose.Types.ObjectId, ref: "users" },
        rating: { type: Number, required: true },
        reviewText: { type: String, required: true },
        isRestaurantReview: Boolean,
        isFoodReview: Boolean,
        photos: {
            type: mongoose.Types.ObjectId,
            ref: "images",
        },
    },
    {
        timestamp: true,
    }
);

// attachments
UserSchema.methods.generateJwtToken = function () { };

//helper functions
UserSchema.statics.findByEmailAndPhone = async () => { };

UserSchema.statics.findByEmailAndPassword = async () => { };

export const ReviewModel = mongoose.Model('review', ReviewSchema);