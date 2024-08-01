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
	// Managing user inputs
	const [memberData, setMemberData] = useState(defaultMemberData);

	const [membersArray, setMembersArray] = useState([]);

	// State Variable:
	// Managing the error message for each input field validation
	const [errors, setErrors] = useState({});

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

	const validateInputs = () => {
		let errors = {};

		// Validating fullName
		if (!memberData.fullName) {
			errors.fullName = 'Full Name is required.';
		} else if (memberData.fullName.length < 3) {
			errors.fullName = 'Full Name should be at least 3 characters long.';
		} else if (/\d/.test(memberData.fullName)) {
			errors.fullName = 'Full Name should not contain number(s).';
		}

		// Validating email
		if (!memberData.email) {
			errors.email = 'Email is required.';
		} else if (
			!/@/.test(memberData.email) ||
			!/(.co.in|.com)$/.test(memberData.email)
		) {
			errors.email =
				'Email should contain @ symbol and end with .co.in or .com.';
		}

		// Validating age
		if (!memberData.age) {
			errors.age = 'Age is required.';
		} else if (isNaN(memberData.age) || memberData.age <= 0) {
			errors.age = 'Age should be greater than 0.';
		}

		// Validating gender
		if (!memberData.gender) {
			errors.gender = 'Gender is required.';
		}

		setErrors(errors);

		/**
		 * If there are no 0 no.of keys in errors object,
		 * it means all the constraints for each input field have been met
		 */
		return Object.keys(errors).length === 0;
	};

	const addNewMemberToArray = (memberData) => {
		if (validateInputs()) {
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
				{errors.fullName && (
					<p className='error-message'>{errors.fullName}</p>
				)}
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
				{errors.email && (
					<p className='error-message'>{errors.email}</p>
				)}
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
				{errors.age && <p className='error-message'>{errors.age}</p>}
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
				{errors.gender && (
					<p className='error-message'>{errors.gender}</p>
				)}
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
