const db = require('../models/index');

module.exports = {
    //insert
    insertOne(item) {
        return db.planet.insertOne(item);
    },
    insertMany(items) {
        return db.planet.insertMany(items);
    },
    // find all
    findAll() {
        return db.planet.find().toArray();
    },
    // find by index
    findByOptions(option) {
        return db.planet.find(option).toArray();
    },
    // delete
    deleteOne(item) {
        return db.planet.deleteOne(item);
    },
    // edit
    edit(item) {
        return db.planet.update(item);
    }
}