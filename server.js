const express = require('express')
const app = express()
const PORT = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let accounts = [
	{
		"id": 1,
		"username": "paulhal",
		"role": "admin"
	},
	{
		"id": 2,
		"username": "johndoe",
		"role": "guest"
	},
	{
		"id": 3,
		"username": "sarahjane",
		"role": "guest"
	}
];

// GET ROUTES
app.get('/', function (req, res) {
	res.send(`
	<h1>Home Page</h1>
	<p>This is the home page served by the server!</p>
	`)
});

app.get('/about', function (req, res) {
  res.send('About, World! This is the About Route')
});

app.get('/accounts', function(req, res) {
	res.json(accounts)
});

app.get('/accounts/:id', function(req, res) {
	const accountId = Number(req.params.id);
	const getAccount = accounts.find(account => account.id === accountId);

	if (!getAccount) {
		res.status(500).send('Account Not Found')
	} else {
		res.json(getAccount);
	}
});

// POST ROUTES
app.post('/accounts', (req, res) => {
	const incomingAccount = req.body;
	accounts.push(incomingAccount);
	res.json(accounts);
});

// PUT ROUTES
app.put('/accounts/:id', (req, res) => {
	const accountID = Number(req.params.id);
	const body = req.body;
	const account = accounts.find( account => accountID === account.id);
	const index = accounts.indexOf(account);

	if (!account) {
		response.status(500).send('Account Not Found')
	} else {
		const updatedAccount = {...account, ...body};
		accounts[index] = updatedAccount;
		res.send(updatedAccount);
	}
})

// DELETE
app.delete('/accounts/:id', (req,res) => {
	const accountID = Number(req.params.id);
	const newAccounts = accounts.filter(account => accountID !== account.id);
	if (!newAccounts) {
		res.status(500).send('Can Not Find that ID')
	} else {
		accounts = newAccounts;
		res.send(accounts);
	}
});

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));