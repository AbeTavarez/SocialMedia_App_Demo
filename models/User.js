import mongoose, { mongo } from 'mongoose';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  displayName: String,
  bio: String,
});

userSchema.methods.name = () => {
  return this.displayName || this.username;
};
