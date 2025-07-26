import mongoose, { Document, Schema } from 'mongoose';

export interface INewsletterSubscriber extends Document {
  email: string;
  name?: string;
  active: boolean;
  unsubscribeToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterSubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    unsubscribeToken: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Generate a random token for unsubscribe functionality
NewsletterSubscriberSchema.pre('save', function (next) {
  if (!this.unsubscribeToken) {
    this.unsubscribeToken = Math.random().toString(36).substring(2, 15) + 
                            Math.random().toString(36).substring(2, 15);
  }
  next();
});

export default mongoose.model<INewsletterSubscriber>('NewsletterSubscriber', NewsletterSubscriberSchema); 