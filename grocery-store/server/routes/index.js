const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')

router.use('/user', userRouter);
router.use('/category', categoryRouter);

module.exports = router

