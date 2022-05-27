import mongoose from 'mongoose';

const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    createUid: {
      // type: String,
      // default: null
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    writeUid: {
      type: String,
      default: null,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteId: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      default: '',
      index: true,
    },
    publish: {
      type: Boolean,
      default: true,
    },
    imageId: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    // contentMarkdown: {
    //     type: String,
    //     default: null
    // },
    // contentHtml: {
    //     type: String,
    //     default: null
    // },
    courseCategory: {
      type: Schema.Types.ObjectId,
      ref: 'CourseCategory',
      default: null,
    },
  },
  { collection: 'course', timestamps: true, versionKey: false },
);

CourseSchema.pre('find', function () {
  this.where({ deleted: { $ne: true } });
});
CourseSchema.pre('findById', function () {
  this.where({ deleted: { $ne: true } });
});
CourseSchema.pre('findOne', function () {
  this.where({ deleted: { $ne: true } });
});
CourseSchema.pre('countDocuments', function () {
  this.where({ deleted: { $ne: true } });
});
CourseSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { deleted: { $ne: true } } });
});

CourseSchema.index({ name: 'text' });

const Course = mongoose.model('Course', CourseSchema, 'course');

Course.createIndexes({ name: 'text' });

export default Course;
