const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
  });

require('./routes')(app);

app.listen(port, () => {
  console.log(`app listening on port: ${port}`)
});
