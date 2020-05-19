const scientists = require('./models/scientists');

const pages = {
    homePage: (req, res) => {
        res.render('home.ejs')
    },
    indexPage: (req, res) => {
        res.render('index.ejs', {
            scientists
        });
    },
    newPage: (req, res) => {
        res.render('new.ejs');
    },
    createItem: (req, res) => {
        scientists.push(req.body);
        res.redirect('/planet');
    },
    showPage: (req, res) => {
        res.render('show.ejs', {
            person: scientists[req.params.index],
            index: req.params.index
        })
    },
    deletePerson: (req, res) => {
        scientists.splice(req.params.index, 1);
        res.redirect('/planet');
    },
    deleteAll: (req, res) => {
        scientists.splice(0, scientists.length); //remove the item from the array
        res.redirect('/planet'); //redirect back to index route
    },
    editPage: (req, res) => {
        res.render(
            'edit.ejs', //render views/edit.ejs
            {
                //pass in an object that contains
                person: scientists[req.params.index], //the fruit object
                index: req.params.index //... and its index in the array
            }
        );
    },
    updateInfo: (req, res) => {
        scientists[req.params.index] = req.body; //in our fruits array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
        res.redirect('/planet'); //redirect to the index page
    }
}

module.exports = pages;

