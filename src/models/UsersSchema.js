import { Schema, model } from 'mongoose';
import { isEmail } from 'validator';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!isEmail(value)) {
        throw new Error({ error: 'Invalid Email address' });
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.isModified('password')) {
    user.password = await hash(user.password, 8);
  }
  next();
});

// eslint-disable-next-line func-names
userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // eslint-disable-next-line no-underscore-dangle
  const token = sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const user = await User.findOne({ email });
  if (!user) {
    // eslint-disable-next-line no-throw-literal
    throw { error: 'Invalid login credentials' };
  }
  const isPasswordMatch = await compare(password, user.password);
  if (!isPasswordMatch) {
    // eslint-disable-next-line no-throw-literal
    throw { error: 'Invalid login credentials' };
  }
  return user;
};

const User = model('User', userSchema);

export default User;
