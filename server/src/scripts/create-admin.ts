import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../schema/admin.schema';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

const adminData = {
  username: 'heyraptomi',
  email: 'kalejaiyecaleb@gmail.com',
  password: '@Kalejaiye11',
  role: 'admin'
};

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      const adminExists = await Admin.findOne({ email: adminData.email });
      
      if (adminExists) {
        console.log('Admin already exists');
      } else {
        const admin = await Admin.create(adminData);
        console.log('Admin created successfully:', admin);
      }
      
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
      process.exit(0);
    } catch (error) {
      console.error('Error creating admin:', error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }); 