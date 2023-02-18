const mongoose = require('mongoose');

mongoose.connect(
  //process.env.MONGODB_URI || 'mongodb+srv://codeArchangel:BannaTree@cluster0.wnhzwuy.mongodb.net/test',
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Shoppe',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
