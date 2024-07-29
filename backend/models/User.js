import mongoose from "mongoose";
  
const userSchema = mongoose.Schema({
    profilePicture: {
        type: String,
        default: ' https://th.bing.com/th?id=OIP.Aa3B6uwjU0BFoZrAQG7GzQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2'
    },
    username: {
      type: String,
      required: [true,"username is required"],
      unique: [true,"username already exists"],
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      minLength: [10,"Bio must be at least 10 characters"],
      maxLength: [2000,"Bio cannot exceed 2000 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Email validation
    },
    phoneNumber: {
      type: String,
      default: '',
      validate: {
        validator: function(v) {
          return v === '' || /^(\+\d{1,3}[- ]?)?\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
    },
    socialMediaLinks: {
      facebook: {
        type: String,
        default: '',
        match: [/^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9(\.\?)?]/, 'Please enter a valid Facebook URL! '],
      },
      twitter: {
        type: String,
        default: '',
        match: [/^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}$/, 'Please enter a valid Twitter URL! '],
      },
      instagram: {
        type: String,
        default: '',
        match: [/^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_\.]{1,30}$/, 'Please enter a valid Instagram URL! '],
      },
    },
    location: {
      type: String,
      trim: true,
      minlength: [2, 'Location must be at least 2 characters long'],
      maxlength: [100, 'Location cannot exceed 100 characters'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
    },
  
},{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;


