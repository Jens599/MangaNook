import { Schema, model, Document, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> {
  signup(name: string, email: string, password: string): Promise<IUser>;
  login(email: string, password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (
  name: string,
  email: string,
  password: string
): Promise<IUser> {
  if (!name || !email || !password)
    throw new Error('All fields must be filled');

  if (!validator.isEmail(email)) throw new Error('Email is not valid');

  const exists = await this.findOne({ email });
  if (exists) throw new Error('Email already exists');

  if (!validator.isStrongPassword(password))
    throw new Error('Password not strong enough');

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });

  return user;
};

userSchema.statics.login = async function (
  email: string,
  password: string
): Promise<IUser> {
  if (!email || !password) throw new Error('All fields must be filled');

  if (!validator.isEmail(email)) throw new Error('Email is not valid');

  const user = await this.findOne({ email });
  if (!user) throw new Error('Incorrect Email or Password');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Incorrect Email or Password');

  return user;
};

const User = model<IUser, IUserModel>('User', userSchema);

export default User;
