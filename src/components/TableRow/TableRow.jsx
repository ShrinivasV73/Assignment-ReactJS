import './TableRow.css';

const TableRow = ({ fullName, email, age, gender, index, deleteFromList }) => {
	return (
		<tr>
			<td>{fullName}</td>
			<td>{email}</td>
			<td>{age}</td>
			<td>{gender}</td>
			<td>
				<button
					className='remove-from-list-button'
					onClick={() => deleteFromList(index)}>
					<strong>Remove</strong>
				</button>
			</td>
		</tr>
	);
};

export { TableRow };
