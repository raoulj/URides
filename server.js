const express 	= require('express')
const morgan 	= require('morgan')
const jsonfile 	= require('jsonfile')
const mongo 	= require('mongodb')
const dbconfig 	= require('./config/db');
const moment 	= require('moment');

const app = express();
app.use(morgan('dev'));
var port = 3000;

var file = "./riders.json"
var data = jsonfile.readFileSync(file)

var client = mongo.MongoClient;
var db

client.connect(dbconfig.url, function(err, database) {
    if (err) throw err;
    db = database.db("uride")
    configureDB(db)
    app.listen(port, () => console.log('Backend on port ' + port))
});

function configureDB(db) {
	db.collection('users').remove()
    db.collection('rides').remove()


    data.forEach(function(rider) {
    	var user = {
			fname: rider.fname,
			lname: rider.lname,
			email: rider.username,
			password: rider.password
		}
    	db.collection('users').insert(user, (err, results) => {
    		if (err) {
    			console.log('error with user generation')
    		}
    	})
    	var user = {
		    fname: rider.fname,
		    lname: rider.lname,
		    email: rider.username,
		    start: rider.start,
		    dest: rider.dest,
		    date: rider.date,
		    time: rider.time,
		    hasGuests: rider.hasGuests,
		    guestsTotal: rider.guestsTotal
    	}
    	db.collection('rides').insert(user, (err, results) => {
    		if (err) {
    			console.log('error with user generation')
    		}
    	})
    })
}

app.get('/isindexSearch.php', (req, res) => {
	res.redirect('/')
})

app.get('/api/search', (req, res) => {
	substr = req.query.q
	re = RegExp(substr, 'i')

	db.collection('rides').find({
		$or: [
			{ start: re },
			{ dest: re }
		]
	}).toArray((err, results) => {
		if (err) {console.log(err); return }
		res.send(results)
	})
})

app.post('/api/login', (req, res) => {
	console.log('logging in')
	var query = { 
		email: req.query.email,
		password: req.query.password
	}

	db.collection('users').find(query).toArray((err, result) => {
		if (err) { console.log(err); return }
		if (result.length == 1) {
			var response = { 
				success: 'Logged in.',
				email: result[0].email,
				fname: result[0].fname
			}
			res.send(response)
		} else if (result.length > 1) {
			var response = { error: `Your account ${email} has been corrupted.`}
			res.send(response)
		} else {
			var response = { error: `Credentials incorrect, please try again.`}
			res.send(response)
		}
	})
});

app.post('/api/register', (req, res) => {
	var user = {
		fname: req.query.fname,
		lname: req.query.lname,
		email: req.query.email,
		password: req.query.password
	}

	query = { email: user.email }
	db.collection('users').find(query).toArray((err, result) => {
		if (err) { console.log(err); return }
		console.log(result)
		if (result.length < 1) {
			db.collection('users').insert(user, (err, results) => {
				if (err) {
					console.log('error with registering new account')
					return
				}

				var response = { 
					success: 'Account created.',
					email: results.ops[0].email,
					fname: results.ops[0].fname
				}
				res.send(response)
			})
		} else {
			var response = { error: 'Account with email already exists.'}
			res.send(response)
		}
	})
	console.log('new account created')
})


app.post('/api/create-ride', (req, res) => {
	// Get the first and last name for the table
	db.collection('users').findOne({
		email: req.query.email
	}, (err, result) => {
		var fname = result.fname
		var lname = result.lname

		// Convert the date format appropriately
		var orignal_date = req.query.date
		var day = moment(orignal_date).format('M/D/YY')

		var ride = {
		    fname: fname,
		    lname: lname,
		    email: req.query.email,
		    start: req.query.start,
		    dest: req.query.dest,
		    date: day,
		    time: req.query.time,
		    hasGuests: req.query.is_multiple,
		    guestsTotal: req.query.guest_count
		}

		db.collection('rides').insert(ride, (err, results) => {
			if (err) {
				console.log('error with registering new ride')
				return
			}
			console.log(results)
			var response = { success: 'Ride created.' }
			res.send(response)
		})

	})
});


app.get('/api/my_rides', (req, res) => {
	email = req.query.email

	db.collection('rides').find({
		email: email
	}).toArray((err, results) => {
		if (err) {console.log(err); return }
		var newResults = results.map(result => {
			result.date = moment(result.date, "M/D/YY").format('YYYY-MM-DD')
		})
		res.send(results)
	})
})

app.post('/api/edit-ride', (req, res) => {
	var orignal_date = req.query.date
	var day = moment(orignal_date).format('M/D/YY')

	var ride = {
	    fname: req.query.fname,
	    lname: req.query.lname,
	    email: req.query.email,
	    start: req.query.start,
	    dest: req.query.dest,
	    date: day,
	    time: req.query.time,
	    hasGuests: req.query.hasGuests,
	    guestsTotal: req.query.guest_count
	}
	var id = new mongo.ObjectID(req.query.id)

	db.collection('rides').updateOne({_id: id}, {$set: ride}, ((err, result) => {
		if (err) {console.log(err); return }
		// console.log(result)
		res.send({success: true})
	}))
})

app.post('/api/delete-rideCLEAR', (req, res) => {
	console.log(req.query.id)
	var id = new mongo.ObjectID(req.query.id)
	db.collection('rides').deleteOne({_id: id}, (err, result) => {
		if (err) {console.log(err); return }
		console.log('deleted')
		res.send({success: true})
	})
})
