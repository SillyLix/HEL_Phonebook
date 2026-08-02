import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import phonebookBackend from './services/phonebookBackend';
import Notification from './components/Notification';

const App = () => {
	// adding persons and filtered persons so the app would update when changed. '
	// The reason for two is that I wanted to save the filtered people deferent
	const [persons, setPersons] = useState([]);
	const [filteredPersons, setFilteredPerson] = useState([]);
	const [noteMessage, setNoteMessage] = useState({
		message: null,
		isError: false,
	});

	// get data from server
	useEffect(() => {
		phonebookBackend.getAll().then((info) => {
			setPersons(info);
			setFilteredPerson(info);
		});
	}, []);

	const setNote = (message, iserror = false, time = 3000) => {
		setNoteMessage({ message: message, isError: iserror });
		setTimeout(() => {
			setNoteMessage({ message: null, isError: false });
		}, time);
	};

	// delete phone number
	const onDeleteButtonClicked = (id) => {
		console.log('delete pressed:', id);

		persons.map((person) => {
			if (person.id === id) {
				if (window.confirm(`delete ${person.name}`)) {
					phonebookBackend
						// delete
						.delatePhone(person.id)
						.then(
							setPersons(() =>
								persons.filter((filterPerson) => filterPerson !== person),
							),
						)
						// show error msg
						.catch(() => {
							setNote(
								`Information of ${person.name} has already been removed from server`,
								true,
							);
						});
				}
			}
		});
	};

	return (
		<div>
			<h2>Phonebook</h2>
			{<Notification note={noteMessage} />}
			<Filter
				persons={persons}
				setFilteredPersons={setFilteredPerson}
			/>
			<h2>add a new</h2>
			<PersonForm
				persons={persons}
				setPersons={setPersons}
				setFilteredPersons={setFilteredPerson}
				setNoteMessage={setNote}
			/>
			<h2>Numbers</h2>

			{filteredPersons.map((person) => (
				<Persons
					key={person.id}
					person={person}
					onDeleteClicked={() => onDeleteButtonClicked(person.id)}
				/>
			))}
		</div>
	);
};

export default App;
