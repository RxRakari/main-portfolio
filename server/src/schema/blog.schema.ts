import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  subtitle: string;
  slug: string;
  coverImage: string;
  cloudinaryId?: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
  intro: string;
  content: string;
  sections: {
    id: string;
    title: string;
    content: string;
  }[];
  published: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    cloudinaryId: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    intro: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    sections: [
      {
        id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
    published: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Ensure slug exists before validation
BlogSchema.pre('validate', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  next();
});

export default mongoose.model<IBlog>('Blog', BlogSchema); 