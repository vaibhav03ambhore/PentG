import mongoose from "mongoose";
  
const userSchema = mongoose.Schema({
    profilePicture: {
        type: String,
        default: '', 
      },
      username: {
        type: String,
        required: true,
      },
      bio: {
        type: String,
        default: '',
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        default: '',
      },
      socialMediaLinks: {
        facebook: {
            type: String,
            default: '',
        },
        twitter: {
            type: String,
            default: '',
        },
        instagram: {
            type: String,
            default: '',
        },
        
      },
      location: {
        type: String,
        default: '',
      },
    password: String,
},{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;


