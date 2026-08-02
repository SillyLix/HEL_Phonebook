require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const personsData = require('./models/personData');

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
app.use(express.static('dist'));

// get requests.
app.get('/api/persons', (request, response, next) => {
	personsData
		.find({})
		.then((person) => {
			response.json(person);
		})
		.catch((error) => next(error));
});

app.get('/info', async (request, response) => {
	const count = await personsData.countDocuments({});

	const infoPage = `
    <div>
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
    </div>
  `;

	response.send(infoPage);
});

app.get('/api/persons/:id', (request, response, next) => {
	personsData
		.findById(request.params.id)
		.then((res) => {
			if (res) {
				response.json(res);
			} else response.status(404).end();
		})
		.catch((error) => next(error));
});

// delete request

app.delete('/api/persons/:id', (request, response, next) => {
	personsData
		.findByIdAndDelete(request.params.id)
		.then(response.status(204).end())
		.catch((error) => next(error));
});

// post request

app.post('/api/persons', (request, response, next) => {
	body = request.body;

	if (!body.name) {
		return response.status(400).json({
			error: 'name is missing',
		});
	} else if (!body.number) {
		return response.status(400).json({
			error: 'number is missing',
		});
	} else if (personsData.collection.countDocuments({ name: body.name }) > 0) {
		return response.status(400).json({
			error: 'name must be unique',
		});
	}

	const data = new personsData({
		name: body.name,
		number: body.number,
	});

	data
		.save()
		.then((res) => response.json(res))
		.catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
	personsData
		.findByIdAndUpdate(request.params.id, request.body, {
			new: true,
			runValidators: true,
			context: 'query',
		})
		.then((respond) => response.json(respond))
		.catch((error) => next(error));
});

const errorHandler = (error, req, res, next) => {
	console.log('error message:', error.message);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted  id' });
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	}
	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
