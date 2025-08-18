import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[];
  images: {
    url: string;
    cloudinaryId?: string;
  }[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  approach: string;
  challenges: string;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema(
  {
    title: {
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
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        cloudinaryId: {
          type: String,
        },
      },
    ],
    githubUrl: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    approach: {
      type: String,
      required: true,
    },
    challenges: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Ensure slug exists before validation
ProjectSchema.pre('validate', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  next();
});

export default mongoose.model<IProject>('Project', ProjectSchema); 