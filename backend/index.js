const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");
const propertyRoute = require('./routes/propertyRoutes.js');
const uploadController = require('./controller/uploadController.js');
// const authController = require('./controllers/authController.js');
// const yachtController = require('./controllers/yachtController.js');
// const userController = require('./controllers/userController.js');
// const commentController = require('./controllers/commentController.js');
const path = require('path');
const authController = require('./controller/authController.js');
const userController = require('./controller/userController.js');
const commentController = require('./controller/commentController.js');

require('./initDB.js')();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('public/images'))


// import ipfsRoute from './routes/ipfsRoutes.js';
// const pinataRoute = require('./routes/pinataRoutes.js')

app.use('/public',express.static(path.join(__dirname,'public')))
app.use('/property', propertyRoute);
app.use('/upload', uploadController)
app.use("/auth", authController);
// app.use("/property", propertyController);
// app.use("/yacht", yachtController);
app.use('/user', userController)
app.use('/comment', commentController)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});