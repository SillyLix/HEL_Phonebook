const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose
	.connect(process.env.MONGODB_URI, { family: 4 })
	.then((result) => console.log('connected to MongoDB'))
	.catch((error) =>
		console.log(`error connecting to MongoDB: ${error.message}`),
	);

const phonebookSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true,
	},
	number: String,
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
