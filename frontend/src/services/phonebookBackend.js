import axios from 'axios';

// URl of the data
const url = '/api/persons';

// this function allows one to receive all the data
const getAll = () => axios.get(url).then((response) => response.data);

// this function allows one to send all the data to database. Will overwrite database
const create = (newPhonebook) =>
	axios.post(url, newPhonebook).then((responses) => responses.data);

// this function will delete the element with this id
const delatePhone = (deletingID) => axios.delete(`${url}/${deletingID}`);

// this function will update the info in this id.
const update = (id, updatedInfo) =>
	axios.put(`${url}/${id}`, updatedInfo).then((response) => response.data);

export default { getAll, create, delatePhone, update };
