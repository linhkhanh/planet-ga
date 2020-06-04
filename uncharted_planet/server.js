// DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;

// MONGODB
const scientists = require('./models/scientists');
const db = require('./models/index');
const { planetController } = require('./controllers/planetController');

// const main = async () => {
//   await db.connect();
//   const insertData = await planetController.insertMany(scientists);
//   console.log('Insert data successfully', insertData);
//   await db.disconnect();
// }

// ///// Middleware //////

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({ secret: 'randomsecret' })); // USE SESSION TO LOGIN/LOGOUT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));;
app.use(methodOverride('_method'));
app.use((req, res, next) => {
  console.log('I run for all routes');
  next();
});

// ROUTES
require('./routes')(app);
// 
// main();
// LISTEN
app.listen(port, () => {
  console.log(`app listening on port: ${port}`)
});
