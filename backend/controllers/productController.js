const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");



// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  // Handle images if sent as a single string or an array
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  // Upload images to Cloudinary
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
      quality: "auto",
      max_file_size: 20 * 1024 * 1024, // Max size 20MB
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  // Assign images to the request body
  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  // Parse `productDetails` and `aboutProducts` if they are sent as JSON strings
  if (typeof req.body.productDetails === "string") {
    req.body.productDetails = JSON.parse(req.body.productDetails);
  }

  if (typeof req.body.aboutProducts === "string") {
    req.body.aboutProducts = JSON.parse(req.body.aboutProducts);
  }

  // Create the product
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});


// GET ALL PRODUCTS
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

  // Execute query for all products before pagination
  let products = await apiFeature.query;
  let filteredProductsCount = products.length;

  // Apply pagination on a new query instance to avoid re-execution of the previous query
  const paginatedApiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
      

  products = await paginatedApiFeature.query;

  res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
  });
});


// GET ALL PRODUCTS:  (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find()

  res.status(200).json({
      success: true,
      products,
  });
});



//get product details//

exports.getProductDetails = catchAsyncErrors( async (req,res,next)=>{
    // const productCount = await Product.countDocuments();
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    res.status(200).json({
        success:true,
        product
        // productCount
    })
})


//update product//(admin)
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images.length > 0) {

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products", // Cloudinary folder for product images
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

    // Now, we need to merge old and new images
    if (images.length === 0 && req.body.images) {
      req.body.images = product.images; // Preserve the old images if no new images are provided
    } else if (images.length > 0) {
      // If there are new images, merge them with the old images
      req.body.images = [...product.images, ...req.body.images]; // Append the new images
    }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,         // Return the updated product
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});


//delete product// (admin)
exports.deleteProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    //Deleting images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      
    }

    await product.deleteOne();
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
})







// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
  
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    })
    
    product.ratings = avg / product.reviews.length;
  
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  
  
  //get all reviews of the product//
  
  exports.getProductReviews = catchAsyncErrors( async(req,res,next)=>{
      const product = await Product.findById(req.query.id);
  
      if(!product){
          return next(new ErrorHandler("Product not found", 404));
      }
  
      res.status(200).json({
          success: true,
          reviews: product.reviews,
      });
  })
  
  
  //Delete Reviews
  
  exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  
      const product = await Product.findById(req.query.productId);
    
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }
    
      const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
      );
    
      let avg = 0;
    
      reviews.forEach((rev) => {
        avg += rev.rating;
      });



      const ratings = avg / reviews.length;
      const numOfReviews = reviews.length;
    
      await Product.findByIdAndUpdate(req.query.productId,
        {
          reviews,
          ratings,
          numOfReviews,
        },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
    
      res.status(200).json({
        success: true,
      });
    });
    
