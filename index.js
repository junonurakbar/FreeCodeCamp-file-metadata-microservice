const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
const File = require('./models/fileSchema')

const {upload, storage} = require('./utils/multerFile')

require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
  const file = new File({
    name: req.file.filename,
    type: req.file.mimetype,
    size: req.file.size,
  })
  try {
    await file.save()
    res.json({file})    
  }
  catch (e) {res.json({error: e})}
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
