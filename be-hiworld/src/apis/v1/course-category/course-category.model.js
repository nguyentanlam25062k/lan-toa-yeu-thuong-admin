import mongoose from "mongoose";

const { Schema } = mongoose;

const CourseCategorySchema = new Schema(
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
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String
        },
        parentId: {
            type: mongoose.ObjectId
        }
    },
    { collection: "course-category", timestamps: true, versionKey: false }
);

CourseCategorySchema.pre("find", function () {
    this.where({ status: { $ne: false } });
});
CourseCategorySchema.pre("findById", function () {
    this.where({ status: { $ne: false } });
});
CourseCategorySchema.pre("findOne", function () {
    this.where({ status: { $ne: false } });
});
CourseCategorySchema.pre("countDocuments", function () {
    this.where({ status: { $ne: false } });
});
CourseCategorySchema.pre("aggregate", function () {
    this.pipeline().unshift({ $match: { status: { $ne: false } } });
});

export default mongoose.model("CourseCategory", CourseCategorySchema, "course-category");
