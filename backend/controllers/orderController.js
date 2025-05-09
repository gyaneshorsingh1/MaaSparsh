const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");





//create new order 

exports.newOrder = catchAsyncErrors(async (req,res,next)=>{

    const order = await Order.create(req.body);

    res.status(201).json({
        success:true,
        order,
    })
})


// In your order controller

exports.getOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId);
  
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
  
    res.status(200).json({ 
      success: true, 
      orderStatus: order.paymentInfo.status // or order.orderStatus
    });
  };
  

//new order with COD
exports.newCodOrder = catchAsyncErrors(async (req, res, next)=>{
    const order = await Order.create(req.body);
    res.status(201).json({
       success:true,
       order,
    });
});

//get single orders // 

exports.getSingleOrder = catchAsyncErrors( async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404));
    }

    res.status(200).json({
        success:true,
        order,
    });

});


//get logged in user orders // 

exports.myOrders = catchAsyncErrors( async(req,res,next)=>{
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success:true,
        orders,
    });

});


//get all Orders -- (Admin)
exports.getAllOrders = catchAsyncErrors( async(req,res,next)=>{
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    })


    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    });

});


//Update Order Status -- (Admin)
exports.updateOrderStatus = catchAsyncErrors( async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400));
    }

    if(req.body.orderStatus==="Shipped"){
        order.orderItems.forEach( async(o) =>{
            await updateStock(o.Product, o.quantity);
        });
    }


    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success:true,
    });

});


async function updateStock(id,quantity) {
    const product = await Product.findById(id);

    product.Stock = quantity;

    await product.save({ validateBeforeSave: false })
    
}



//Delete Order -- (Admin)
exports.deleteOrder = catchAsyncErrors( async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404));
    }
    const orders = await Order.find();
    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    })

    await order.deleteOne()

    res.status(200).json({
        success:true,
        totalAmount,
    });

});





