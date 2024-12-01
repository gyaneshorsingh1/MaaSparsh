const { kMaxLength } = require("buffer");
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please eneter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product Price"],
    kMaxLength: [8, "Price cannot exceed 8 character"],
  },
  numOfReviews:{
    type:Number,
    default:0
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category:{
    type:String,
    required:[true,"Please enter product category"],
  },
  Stock:{
    type:Number,
    required: [true,"Please Enter Product Stock"],
    maxLength:[4,"Stock cannot exceed 4 characters"],
    default:0,
  },
  reviews:[
    {
      user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
      },
        name:{
            type:String,
            required: true,

        },
        rating:{
            type:Number,
            required:true,

        },
        comment:{
            type:String,
            required:true
        }
    }
  ],

  productDetails: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],

  aboutProducts: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  

  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
  },
  createdAt: {
    type:Date,
    default:Date.now
  }
});



module.exports = mongoose.model("Product", productSchema);