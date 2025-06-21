import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../schema/admin.schema';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

// Admin credentials
const adminData = {
  username: 'heyrapto',
  email: 'kalejaiyecal@gmail.com',
  password: '@Kalejaiye11',
  role: 'admin'
};

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Check if admin already exists
      const adminExists = await Admin.findOne({ email: adminData.email });
      
      if (adminExists) {
        console.log('Admin already exists');
      } else {
        // Create new admin
        const admin = await Admin.create(adminData);
        console.log('Admin created successfully:', admin.username);
      }
      
      // Disconnect from MongoDB
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