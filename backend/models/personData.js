const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose
	.connect(process.env.MONGODB_URI, { family: 4 })
	.then((result) => console.log('connected to MongoDB'))
	.catch((error) =>
		console.log(`error connecting to MongoDB: ${error.message}`),
	);

const validateNum = (num) => {
	console.log(num);

	const numHalf = num.split('-');

	console.log(numHalf);

	if (numHalf.length > 2) return false;
	else if (numHalf[0].length !== 2 && numHalf[0].length !== 3) return false;

	return true;
};

const validateDash = (num) => {
	if (!num.includes('-')) return false;
};

const validateNumber = [
	{ validator: validateDash, message: ' ({VALUE}) did not have "-"' },
	{
		validator: validateNum,
		message: ' ({VALUE}) did not match form 123-456789',
	},
];

const phonebookSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true,
	},
	number: {
		type: String,
		validate: validateNumber,
	},
});

phonebookSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject.__v;
		delete returnedObject._id;
	},
});

const Phonebook = mongoose.model('Phonebook', phonebookSchema);

module.exports = mongoose.model('Phonebook', phonebookSchema);
