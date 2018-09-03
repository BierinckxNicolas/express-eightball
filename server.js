const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./ask');

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));




app.get('/', (req, res) => {
   res.redirect('/ask')
})


app.get('/ask', (req, res) => {
   res.render('ask.ejs', {})
})


app.post('./ask', (req, res) => {
  var res = "";
  var answers = ['It is certain.',
     'It is decidedly so.',
   'Without a doubt.',
   'Yes - definitely.',
   'You may rely on it.',
   'As I see it, yes.',
   'Most likely.',
   'Outlook good.',
   'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Dont count on it.',
    ' My reply is no.',
    'My sources say no',
    'Outlook not so good.',
    'Very doubtful.'];


    for (var key in localStorage){
      if(req == key) {
        if(localStorage.getItem(key) == null) {
          res = answers[Math.floor(Math.random() * answers.length)];
        }
          
    
      else {
          res = localStorage.getItem(key);
      }

    }
    else {
      res = answers[Math.floor(Math.random() * answers.length)];
    }
  }

   localStorage.setItem(req.body,res),(err, result) => {
    if (err) return console.log(err)
    res.render('ask.ejs', { answer: result})
   }
  })





