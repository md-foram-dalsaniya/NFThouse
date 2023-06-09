const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () => {
    mongoose.connect(process.env.DBURI
    // ,{ useNewUrlParser:true,useUnifiedTopology:true}
)
    .then(() => console.log("Connection to DB success"))
    .catch((err) => console.log(err));
}