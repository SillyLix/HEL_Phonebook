const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
morgan.token('postData', (req, res) => {
	return JSON.stringify(req.body);
});
app.use(
	morgan(
		`:method :url :status :res[content-length] - :response-time ms :postData`,
	),
);

let phoneNumbers = [
	{
		id: '1',
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: '2',
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: '3',
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: '4',
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

const infoPage = `
<div>
	<p>Phonebook has info for ${phoneNumbers.length} people </p>
	<p>${new Date()}</p></div>
`;

const GenerateRandomID = () => {
	const IDkeys =
		'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ-#&%_';
	const idLength = 10;
	let ID = '';

	for (let index = 0; index < idLength; index++) {
		ID += IDkeys[Math.floor(Math.random() * IDkeys.length)];
	}

	if (phoneNumbers.find((number) => number.id === ID)) {
		return GenerateRandomID();
	} else return ID;
};

// get requests.
app.get('/api/persons', (request, response) => {
	response.json(phoneNumbers);
});

app.get('api/persons/info', (request, response) => {
	response.send(infoPage);
});

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	const number = phoneNumbers.find((num) => num.id === id);

	if (number) {
		response.json(number);
	} else response.status(404).end();
});

// delete request

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	phoneNumbers = phoneNumbers.filter((number) => number.id !== id);

	response.status(204).end();
});

// post request

app.post('/api/persons', (request, response) => {
	body = request.body;

	if (!body.name) {
		return response.status(400).json({
			error: 'name is missing',
		});
	} else if (!body.number) {
		return response.status(400).json({
			error: 'number is missing',
		});
	} else if (phoneNumbers.find((number) => number.name === body.name)) {
		return response.status(400).json({
			error: 'name must be unique',
		});
	}

	const data = {
		id: GenerateRandomID(),
		name: body.name,
		number: body.number,
	};

	phoneNumbers = phoneNumbers.concat(data);
	response.json(data);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log('opening a port in', PORT);
});
