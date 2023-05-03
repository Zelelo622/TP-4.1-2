const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");
const orderRouter = require("./orderRouter");
const profileRouter = require("./profileRouter");

router.use("/user", userRouter);
router.use("/profile", profileRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);

module.exports = router;
