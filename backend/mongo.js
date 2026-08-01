const mongoose = require('mongoose');

if (process.argv.length < 3 || process.argv.length > 5) {
	console.log(
		'you need to give argument: node mongo.js <yourPassword> <name> <number>',
	);
	return 0;
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://lix_fullstack:${password}@cluster0.9c1hnit.mongodb.net/phonebook?appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url, { family: 4 });

const phonebookSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const PhoneBook = mongoose.model('PhoneBook', phonebookSchema);

if (!number || !name) {
	console.log('phonebook:');

	PhoneBook.find({}).then((result) => {
		result.forEach((person) => {
			console.log(`${person.name} ${person.number}`);
		});
		mongoose.connection.close();
	});
} else {
	const phonebook = new PhoneBook({
		name: name,
		number: number,
	});

	phonebook.save().then((result) => {
		console.log(`added ${result.name} ${result.number} to phonebook`);

		mongoose.connection.close();
	});
}
