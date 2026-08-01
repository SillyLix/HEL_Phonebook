import './Notification.css';

const Notification = ({ note = {} }) => {
	if (note.message === null) return;
	else if (note.isError) return <div className="error">{note.message}</div>;
	else return <div className="note">{note.message}</div>;
};

export default Notification;
