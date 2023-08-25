const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const XLSX = require('xlsx-to-json');
const csv = require('csvtojson');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MongoDB configuration
mongoose.connect('mongodb+srv://traveller:Manoj1999@traveller.ots9ysb.mongodb.net/InsuredMine', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Connect to MongoDB
const DataSchema = new mongoose.Schema({
    agent: String,
    userType: String,
    policy_mode: {type: Number, required: true},
    producer:String,
    policy_number:String,
    premium_amount:{type: Number, required: true},
    policy_type:String,
    company_name:String,
    category_name:String,
    policy_start_date:{ type: Date, default: Date.now },
    policy_end_date: { type: Date, default: Date.now },
    csr:String,
    account_name:String,
    email:String,
    firstName:String,
    city:String,
    account_type:String,
    phone:{type: Number, required: true},
    address:String,
    state:String,
    zip:{type: Number, required: true},
    dob:{type:Date, default: Date.now},
    accountNumber: {type: Number, required: true},
    ifscCode: String
  });
  

  const DataModel = mongoose.model('Data', DataSchema);
  const collection = db.collection('datas');

  // API endpoint for file upload
  app.post('/uploads', upload.single('file'), (req, res) => {
    console.log(req.file,'mmmmmmmmmmmmmmmmmmmmmmmmm');
    const filePath = req.file.path;
    const fileExtension = filePath.split('.').pop().toLowerCase();

    if (fileExtension === 'xlsx') {
      XLSX({
        input: filePath,
        output: 'output.json',
      }, (err, result) => {
        if (err) {
          res.status(400).json({ error: 'Error converting XLSX to JSON' });
          return;
        }
        
        collection.insertMany(result, (err) => {
          if (err) {
            res.status(500).json({ error: 'Error inserting data into MongoDB' });
            return;
          }
          res.json({ message: 'Data uploaded successfully' });
        });
      });
    } else if (fileExtension === 'csv') {
      csv()
        .fromFile(filePath)
        .then((result) => {
          collection.insertMany(result, (err) => {
            if (err) {
              res.status(500).json({ error: 'Error inserting data into MongoDB' });
              return;
            }
            res.json({ message: 'Data uploaded successfully' });
          });
        })
        .catch((err) => {
          res.status(400).json({ error: 'Error reading CSV file' });
        });
    } else {
      res.status(400).json({ error: 'Invalid file format' });
    }
  });


  const userRoutes = require('./routes/userRoute');
const accountRoutes = require('./routes/accountRoute');
const policyRoutes = require('./routes/policyRoute');

app.use('/api', userRoutes);
app.use('/api', accountRoutes);
app.use('/api', policyRoutes);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
