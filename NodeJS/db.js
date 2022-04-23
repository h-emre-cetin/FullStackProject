const mongoose = require('mongoose');
require('dotenv').config();


try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      process.env.DB_CONNECT,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("***MongoDB database connection established successfully!***")
    );

  } catch (e) {
    console.log("Error to connect to MongoDb");
  }

 
module.exports=mongoose;