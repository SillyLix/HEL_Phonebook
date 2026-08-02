import { useState } from 'react';
import phonebookBackend from '../services/phonebookBackend';

const PersonForm = ({ persons, setPersons, setNoteMessage }) => {
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

	const onAddButtonClicked = (event) => {
		console.log(event);
		event.preventDefault();

		// warn if empty field and don't move forward
		if (newName === '' || newNumber === '') {
			window.alert('name or number is empty. Fill in both of them.');
			return;
		}

		// check if the person exists and add if don't
		const filteredPersons = persons.filter(
			(element) =>
				element.name.toLowerCase().trim() === newName.toLowerCase().trim(),
		);

		if (filteredPersons.length === 0) {
			const data = {
				name: newName,
				number: newNumber,
			};

			phonebookBackend
				.create(data)
				.then((response) => {
					setNoteMessage(
						`Added ${response.name} with phone number ${response.number}`,
					);
					return setPersons(persons.concat(response));
				})
				.catch((error) => {
					setNoteMessage(error.response.data.error, true, 5000);
				});
		} else {
			console.log(filteredPersons);

			if (
				window.confirm(
					`${newName} is already added to the phonebook, replace the old number with a new number`,
				)
			) {
				const data = {
					name: newName,
					number: newNumber,
				};

				filteredPersons.map((element) => {
					console.log(element);

					return phonebookBackend.update(element.id, data).then((response) => {
						setNoteMessage(
							`Changed number to ${response.number} for ${response.name}`,
						);

						return setPersons(
							persons.map((person) =>
								person.id === element.id ? response : person,
							),
						);
					});
				});
			}
		}
	};

	const handleNameInputChange = (event) => setNewName(event.target.value);

	const handleNumberInputChange = (event) => setNewNumber(event.target.value);

	return (
		<form>
			<div>
				name:{' '}
				<input
					type="text"
					value={newName}
					onChange={handleNameInputChange}
				/>
			</div>
			<div>
				number:{' '}
				<input
					type="text"
					value={newNumber}
					onChange={handleNumberInputChange}
				/>
			</div>
			<div>
				<button
					type="submit"
					onClick={onAddButtonClicked}
				>
					add
				</button>
			</div>
		</form>
	);
};

export default PersonForm;
