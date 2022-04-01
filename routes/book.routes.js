const express = require('express');

const bookRoute = express.Router();
let Book = require('../model/Book');


// Add book
bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    })
})

// Get all book
bookRoute.route('/').get((req, res, next) => {

    querySearch = {
        name: new RegExp(req.query.name, 'i'),
        price: new RegExp(req.query.price, 'i'),
        description: new RegExp(req.query.description, 'i'),
    }

    Book.find(querySearch, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Get book
bookRoute.route('/read-book/:id').get((req, res, next) => {
    Book.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update book
bookRoute.route('/update-book/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error);
        } else {
            res.json(data);
            console.log('Book Updated Successfully');
        }
    })
})

// Delete book
bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    })
})

module.exports = bookRoute;