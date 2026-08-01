import { useState, useEffect } from 'react';

const Filter = ({ persons, setFilteredPersons }) => {
	const [newValue, setValue] = useState('');

	// change the value when written smth in filter
	const onFilteredPersonChanged = (event) => {
		const value = event.target.value;

		setValue(value);

		if (value === '') {
			setFilteredPersons(persons);
		} else {
			setFilteredPersons(
				persons.filter((person) =>
					person.name.toLowerCase().includes(value.toLowerCase()),
				),
			);
		}
	};

	// keep filtered persons in sync when the full persons list changes
	useEffect(() => {
		console.log('useEffect used');

		if (newValue === '') {
			setFilteredPersons(persons);
		} else {
			setFilteredPersons(
				persons.filter((person) =>
					person.name.toLowerCase().includes(newValue.toLowerCase()),
				),
			);
		}
	}, [persons, newValue, setFilteredPersons]);

	return (
		<div>
			filter shown with{' '}
			<input
				type="text"
				value={newValue}
				onChange={onFilteredPersonChanged}
			/>
		</div>
	);
};

export default Filter;
