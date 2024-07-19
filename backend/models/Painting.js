import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const paintingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Painting name is required"],
    maxlength: [32, "Painting name cannot exceed 32 characters"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength:[10, "Description must be at least 10 characters"],
    maxlength: [2000, "Description cannot exceed 2000 characters"],
    trim: true,
  },
  creator: {
    type: ObjectId,
    ref: "User",
    required: [true, "Creator is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
    max: [1000000, "Price cannot exceed 1,000,000"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  status: {
    type: String,
    enum: ["For Sale", "Sold","Ordered"],
    default: "For Sale",
  },
  medium: {
    type: String,
    required: [true, "Medium is required"],
    enum: ["Oil", "Acrylic", "Watercolor"],
  },
  dimensions: {
    type: String,
    required: [true, "Dimensions are required"],
    trim: true,
    validate: {
      validator: function(v) {
        return /^(\d+x\d+\s?(inches|cm))$/.test(v);
      },
      message: props => `${props.value} is not in a valid format! (valid ex: 12x10 inches, 12x10 cm)`,
    },
  },
  yearCreated: {
    type: Number,
    required: [true, "Year is required"],
    min: [1947, "Year must be greater than 1947"],
    max: [new Date().getFullYear(), "Year cannot be greater than current year"],
    trim: true,
  },
  isAgreedToTerms: {
    type: Boolean,
    required: [true, "Agreeing to terms is required"],
    default: false,
  },
}, {
  timestamps: true,
});

paintingSchema.index({ name: 1 });
paintingSchema.index({ creator: 1 });

const Painting = mongoose.model("Painting", paintingSchema);
export default Painting;
