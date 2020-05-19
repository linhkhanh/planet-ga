const pages = require('./controller');

module.exports = (app) => {
    app.get('/planet', pages.indexPage);
    app.get('/', pages.homePage);
    app.get('/planet/new', pages.newPage);
    app.post('/planet', pages.createItem);
    app.delete('/planet/all', pages.deleteAll );
    app.delete('/planet/:index', pages.deletePerson);
    app.get('/planet/:index', pages.showPage);
    app.get('/planet/:index/edit', pages.editPage);
    app.put('/planet/:index', pages.updateInfo);
}