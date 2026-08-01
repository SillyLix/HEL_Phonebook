const Persons = ({ person, onDeleteClicked }) => {
	return (
		<p>
			{person.name}, {person.number}{' '}
			<button onClick={onDeleteClicked}>delete</button>
		</p>
	);
};
export default Persons;
