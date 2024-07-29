import { useState } from 'react';
import { TableRow } from '../TableRow/TableRow.jsx';

import './MembersData.css';

const defaultMemberData = {
	fullName: '',
	email: '',
	age: '',
	gender: '',
};

const MembersData = () => {
	// State Variable
	// Managing Addition of New Member
	const [isAdding, setIsAdding] = useState(false);

	// State Variable:
	// Manaing user inputs
	const [memberData, setMemberData] = useState(defaultMemberData);

	const [membersArray, setMembersArray] = useState([]);

	// Handler Function:
	// Updating state of addition of new members based on previous state
	const handleAddingNewMember = () => {
		setIsAdding((isAdding) => !isAdding);
	};

	// Updating input data on every keypress
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setMemberData({
			...memberData,
			[name]: value,
		});
	};

	const addNewMemberToArray = (memberData) => {
		/**
		 * Adding Basic Validation to ensure
		 * All fields are filled to succesfully add the record
		 */
		if (
			memberData.fullName !== '' &&
			memberData.email !== '' &&
			memberData.age !== '' &&
			memberData.gender !== ''
		) {
			const updatedMembersList = [...membersArray, memberData];
			setMembersArray(updatedMembersList);
			setMemberData(defaultMemberData);
			handleAddingNewMember();
		}
	};

	const removeMember = (membersIndex) => {
		const updatedMembersList = membersArray.filter(
			(_, index) => index !== membersIndex,
		);
		setMembersArray(updatedMembersList);
	};

	const acceptNewMember = (
		<div id='accept-new-member'>
			<div className='input-field-container'>
				<label
					className='input-label'
					htmlFor='fullName'>
					Full Name
				</label>
				<input
					type='text'
					name='fullName'
					id='fullName'
					onChange={handleInputChange}
					value={memberData.fullName}
					required
				/>
			</div>
			<div className='input-field-container'>
				<label
					className='input-label'
					htmlFor='email'>
					Email
				</label>
				<input
					type='email'
					name='email'
					id='email'
					value={memberData.email}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div className='input-field-container'>
				<label
					className='input-label'
					htmlFor='age'>
					Age
				</label>
				<input
					type='text'
					name='age'
					id='age'
					value={memberData.age}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div className='input-field-container'>
				<label className='input-label'>Gender</label>
				<div>
					<input
						type='radio'
						name='gender'
						id='genderMale'
						value='Male'
						checked={memberData.gender === 'Male'}
						onChange={handleInputChange}
					/>
					<label htmlFor='genderMale'>Male</label>
				</div>
				<div>
					<input
						type='radio'
						name='gender'
						id='genderFemale'
						value='Female'
						checked={memberData.gender === 'Female'}
						onChange={handleInputChange}
					/>
					<label htmlFor='genderFemale'>Female</label>
				</div>
				<div>
					<input
						type='radio'
						name='gender'
						id='genderOther'
						value='Other'
						checked={memberData.gender === 'Other'}
						onChange={handleInputChange}
					/>
					<label htmlFor='genderOther'>Other</label>
				</div>
			</div>
			<div className='input-field-container'>
				<button
					className='add-to-list-button'
					onClick={() => addNewMemberToArray(memberData)}>
					<strong>Add to List</strong>
				</button>
			</div>
		</div>
	);
	return (
		<div className='information-container'>
			{/**
			 * Conditionally Rendering the input fields
			 */}
			{isAdding && acceptNewMember}
			<table>
				<thead>
					<tr>
						<th>Full Name</th>
						<th>Email</th>
						<th>Age</th>
						<th>Gender</th>
					</tr>
				</thead>
				<tbody>
					{membersArray.map((item, index) => (
						<TableRow
							{...item}
							key={index}
							index={index}
							deleteFromList={removeMember}
						/>
					))}
				</tbody>
			</table>
			<button
				onClick={handleAddingNewMember}
				className='add-new-member-button'>
				<strong>Add New Member</strong>
			</button>
		</div>
	);
};

export { MembersData };
