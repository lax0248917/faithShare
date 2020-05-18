const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/prayers');
const prayers = db.get('prayers');

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'FaithShare!!!!! 🙏'
  });
});

app.get('/prayers', (req, res) => {
  prayers.find().then(prayers => {
    res.json(prayers);
  })
})

function isValidPrayer(prayer) {
  return prayer.name && prayer.name.toString().trim() !== '' && prayer.content && prayer.content.toString().trim() !== '';
}


app.post('/prayers', (req, res) => {
  if (isValidPrayer(req.body)) {
    // insert into db...
    const prayer = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      created: new Date()
    };

    prayers.insert(prayer).then(createdPrayer => {
      res.json(createdPrayer);
    });

    console.log(prayer);

  } else {
    res.status(422);
    res.json({
      message: 'Please be sure to include both Name and a Prayer!'
    })
  }
})

app.listen(5500, () => {
  console.log('Listening on http://localhost:5500')
})