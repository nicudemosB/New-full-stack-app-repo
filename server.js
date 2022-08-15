//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const Track = require('./models/trackSchema.js')
const Data = require('./models/trackData.js')

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes

app.delete('/racers/:id', (req, res) => {
    Track.findByIdAndRemove(req.params.id, (err, racers) => {
        res.redirect('/new')
    })
    // res.send('deleting...')
})

app.get('/seed', (req, res) => {
    Track.create(Data, (err, data ) => {
        res.redirect('/racers')
        console.log('Added track data successfully');
    })
})

app.get('racers/:id/show' ,(req, res) => {
    Track.findById(req.params.id, (err, editRacer) => {
        res.render('show.ejs', {
            racers: editRacer  
            
        })
        
    })
})

// 

app.get('/', (req, res) => {
   res.render('welcome.ejs')
    })

    app.get('/racers', (req, res) => {
        // grabbing and holding onto data
        Track.find({}, (err, allRacers) => {
            res.render('show.ejs', {
                // variable = data
                racers: allRacers
            })
        })
    })


app.get('/racers/new', (req, res) => {
    res.render('new.ejs')
    })

    app.post('/racers/:id', (req, res) => {
        Track.findById(req.body, (err, editedRacers) => {
            res.redirect('/racers/show')
    
        })
    })

app.get('/racers/edit', (req, res) => {
    res.render('edit.ejs')
})


app.get('/racers/:id', (req, res) => {
    Track.findById({}, (err, editRacer) => {
        res.render('edit.ejs', {racers: editRacer})
    })
    // res.render('edit.ejs')
})



app.post('/racers', (req, res) => {
   Track.create (req.body, (err, createdRacers) => {
    res.redirect('/racers')
   })
})





app.get('/racers/:id', (req, res) => {
    Track.findById(req.params.id, (err,foundRacers) => {
        res.render('show.ejs', {racers: foundRacers})
        
    })
})


app.get('/racers/show', (req,res) => {
    res.render('show.ejs')
})


app.put('/racers/:id', (req, res) => {
    Track.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updateRacer) => {
        res.redirect('/racers/show')
    })
})



// app.post('/racers/show', (req, res) => {
//     Track.create (req.body, (err, createdRacer) => {
//         res.redirect('edit.ejs')
        
//     })
// })

// app.put('/racers/:id', (req, res) => {
    //     Track.findByIdAndUpdate(req.params.id, req.body, {new: true},( err, updateName) => {
        //         res.redirect('/show')
        //     })
        // })
        
        // app.get('/racers/show', (req, res) => {
            //     res.render('show.ejs ')
            //     Track.find({}, (err, allRacers) => {
                //         res.render('show.ejs', {racers: allRacers})
                //     })
                // })
                
                
                // app.get('/cars/:id', (req, res) => {
                    //     Track.findById(req.params.id, (err, foundRacer) => {
                        //         res.render('show.ejs', {racers:foundRacer})
                        //     })
                        // })
                        
                        // app.get('/racers/:id/edit', (req, res) => {
                        //     Track.findById(req.params.id, (err, editTrack) => {
                        //         res.render('edit.ejs', {racers: editTrack})
                        //     })
                        // })
                        //___________________
                        //localhost:3000
                        //localhost:3000
                        // app.get('/' , (req, res) => {
                            //     res.send('Hello World!');
                            //   });
                            //___________________
                            //Listener
                            //___________________
                            app.listen(3000, () => 
                            console.log( 'Listening on port:', 3000));
                            
                            // mongoose.connect('mongodb://127.0.0.1:27017/trackDay', () => {
                                //     console.log('connection to mongodb established');
                                // })