import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

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

// if password id not modified skip
userSchema.pre('save', (done) => {
  let user = this;
  if (!user.isModified('password')) {
    return done();
  }

  bcrypt.genSalt(SALT_ROUNDS, () => {
    if (err) return err;

    bcrypt.hash(user.password, SALT_ROUNDS, (err, hashedPassword) => {
      if (err) return done(err);

      user.password = hashedPassword;
      done();
    });
  });
});

userSchema.methods.checkPasswords = (guess, done) => {
  bcrypt.compare(guess, this.password, (err, res) => {
    done(err, res);
  });
};

const User = mongoose.model('User', userSchema);

export default User;
