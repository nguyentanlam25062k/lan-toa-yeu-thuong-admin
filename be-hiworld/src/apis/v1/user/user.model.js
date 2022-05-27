import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        createUid: {
            type: String,
            default: null
        },
        writeUid: {
            type: String,
            default: null
        },
        status: {
            type: Boolean,
            default: true
        },
        deleteId: {
            type: String,
            default: null
        },
        lastName: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        phone: {
            type: String
        },
        ImageId: {
            type: String
        },
        ImageUrl: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { collection: "user", timestamps: true, versionKey: false }
);

UserSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

UserSchema.pre("find", function () {
    this.where({ status: { $ne: false } });
});
UserSchema.pre("findById", function () {
    this.where({ status: { $ne: false } });
});
UserSchema.pre("findOne", function () {
    this.where({ status: { $ne: false } });
});
UserSchema.pre("countDocuments", function () {
    this.where({ status: { $ne: false } });
});
UserSchema.pre("aggregate", function () {
    this.pipeline().unshift({ $match: { status: { $ne: false } } });
});

export default mongoose.model("User", UserSchema, "user");
