const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder, newCodOrder, getOrderStatus} = require("../controllers/orderController");
const { deleteOne } = require("../models/userModel");
const router = express.Router();



router.route("/order/new").post(isAuthenticatedUser,newOrder)

router.route("/order/status/:orderId").get(isAuthenticatedUser, getOrderStatus);


router.route("/cod/order/new").post(isAuthenticatedUser, newCodOrder)

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)

router.route("/orders/me").get(isAuthenticatedUser, myOrders)

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)

router.route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);


module.exports = router;
