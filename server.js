const express = require('express')
const morgan = require('morgan')
const engine = require('elasticlunr')
const jsonfile = require('jsonfile')


const app = express();
app.use(morgan('dev'));
var port = 3000;

// Set up engine
var file = "./riders.json"
var index = engine(function() {
    this.addField('title');
    this.setRef('id');
});

var data = jsonfile.readFileSync(file)
data.forEach((record) => {
	index.addDoc(record)
})

app.get('/isindexSearch.php', (req, res) => {
	res.redirect('/')
})

app.get('/api/search', (req, res) => {
	console.log('Search: ' + req.query.q)
	if (req.query.q === undefined) { res.send(data); return}
	const substr = req.query.q.toLowerCase() //Case insensitive
	// If there's no query, return all results
	if (substr === '') { res.send(data); return}
	subset = data.filter(function(record) {
		return record.start.toLowerCase().indexOf(substr) !== -1 || record.dest.toLowerCase().indexOf(substr) !== -1
	})
	res.send(subset)
})


app.listen(port, () => console.log('Backend on port ' + port))