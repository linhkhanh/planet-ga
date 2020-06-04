const scientists = require('../models/scientists');
const db = require('../models/index');
const { planetController } = require('./planetController');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const pages = {
    homePage: (req, res) => {
        console.log(req.session.index);
        res.render('home.ejs', {
            name: req.session.name,
            id: req.session.index
        });
    },
    indexPage: (req, res) => {
        if (req.session.name) {
            res.render('index.ejs', {
                scientists,
                name: req.session.name,
                id: req.session.index
            });
        }
    },
    newPage: (req, res) => {
        res.render('new.ejs',
            {
                name: req.session.name,
                id: req.session.index
            });
    },
    createItem: (req, res) => {
        scientists.push(req.body);
        res.redirect('/planet');
    },
    showPage: (req, res) => {
        if (req.session.name) {
            res.render('show.ejs', {
                name: req.session.name,
                person: scientists[req.params.index],
                index: req.params.index
            })
        }
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
    },
    loginPage: (req, res) => {
        res.render('signin.ejs')
    },
    loginSubmit: (req, res) => {
        console.log(req.body);
        const isExistUser = (item) => {
            return item.email == req.body.email && item.pw == req.body.pw
        }
        scientists.forEach((item, index) => {
            if (item.email == req.body.email && item.pw == req.body.pw) {
                req.session.name = item.name;
                req.session.index = index;
                res.redirect(`/`);
                return;
            }
        })
        let result = scientists.some(isExistUser);

        if (!result) {
            res.send('Your password or your email is wrong');
        }
    },
    logOut: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.redirect('/');
        })
    },
    upload: function (req, res, next) {
        console.log(req.file);
        cloudinary.uploader.upload(req.file.path,
            function (error, result) {
                console.log(result, error);
                if (!scientists[req.session.index].image) scientists[req.session.index].image = [];
                scientists[req.session.index].image.push(result.url);
            }
        )
        res.render(`/planet/${req.session.index}`);
    }
}

module.exports = pages;

