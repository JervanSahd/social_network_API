// const { connect, connection } = require("mongoose");
// const {MongoClient} = require ('mongodb');

// const connectionString =
//   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB";

// connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// module.exports = connection;

const mongoose = require("mongoose");

// Wrap Mongoose around local connection to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/socialDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('debug',true);

// Export connection
module.exports = mongoose.connection;
