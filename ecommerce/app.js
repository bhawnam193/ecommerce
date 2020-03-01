const express = require('express');
const app = express();
const expressValidator = require('express-validator')
require('dotenv').config();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes for authentication
const authRouter = require('./routes/auth');
app.use("/api", authRouter);

//routes for users
const userRouter = require('./routes/user');
app.use("/api", userRouter);

//routes for category
const catRouter = require('./routes/category');
app.use("/api", catRouter);

//routes for products
const productRouter = require('./routes/product');
app.use("/api", productRouter);

//routes for braintree
const braintreeRouter = require('./routes/braintree');
app.use("/api", braintreeRouter);

//routes for order
const orderRoutes = require('./routes/order');
app.use("/api", orderRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});