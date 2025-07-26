import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  period: string; // Added for the landing page
  description: string;
  achievements: string[];
  technologies: string[];
  order: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    period: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    achievements: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Generate period string before saving if not provided
ExperienceSchema.pre('save', function (next) {
  if (!this.period) {
    const startYear = this.startDate ? new Date(this.startDate).getFullYear().toString() : '';
    const endYear = this.current ? 'Present' : (this.endDate ? new Date(this.endDate).getFullYear().toString() : '');
    this.period = `${startYear} - ${endYear}`;
  }
  next();
});

export default mongoose.model<IExperience>('Experience', ExperienceSchema); 