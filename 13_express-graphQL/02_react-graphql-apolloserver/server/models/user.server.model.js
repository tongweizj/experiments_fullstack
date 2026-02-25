import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password.trim(), salt);
  this.password = hashedPassword;
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
