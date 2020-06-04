const pages = require('./controllers/controller');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// CLOUDINARY
cloudinary.config({
    cloud_name: 'dt5rqi1l9',
    api_key: '552321872584896',
    api_secret: 'FC0feHoGttL0P8HFBDiZNWthplo'
  });

module.exports = (app) => {
    app.get('/planet', pages.indexPage);
    app.get('/', pages.homePage);
    app.get('/login', pages.loginPage);
    app.get('/logout', pages.logOut);
    app.get('/planet/new', pages.newPage);
    app.post('/planet', pages.createItem);
    app.post('/login_submit', pages.loginSubmit);
    app.post('/upload', upload.single('image'), pages.upload);
    app.delete('/planet/all', pages.deleteAll );
    app.delete('/planet/:index', pages.deletePerson);
    app.get('/planet/:index', pages.showPage);
    app.get('/planet/:index/edit', pages.editPage);
    app.put('/planet/:index', pages.updateInfo);
}