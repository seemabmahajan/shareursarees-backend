const mongoose = require('mongoose');
const db =  require('./models');

// MongoDB Connection String
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shareursarees';

// Connect MongoDB
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(`MongoDB error: ${err}`));

  const saris = [
    {
      num: 100,
      catagory: "Silk",
      description: 'Turquoise Blue Paithini',
      image: '/images/saripurple.jpg'
    },
    {
        num: 101,
        catagory: "Chiffon",
        description: 'White with embroidery',
        image: '/images/sariwhite.jpg'
      
    },
    {
  
        num: 102,
        catagory: "Cotton",
        description: 'Beautiful exclusive from the orchads',
        image: '/images/sariwine.jpg'
    },
    
  ];
  
  
  // Delete All Saris
console.log('Deleting all saris..');

db.Sari.deleteMany({}, (err, result) => {
  if (err) {
    console.log(err);
    process.exit();
  }

  

  // Create New Saris
  console.log('Creating new saris...');

  db.Sari.create(saris, (err, newSaris) => {
    if (err) {
      console.log(err);
      process.exit();
    }

    console.log(`Successfully created ${newSaris.length} saris.`);
    process.exit();
  });
});