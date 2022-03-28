import { useState } from 'react';
import './profile.css';

const Profile = ({user, saveUser}) => {

    const editedUser = {
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email
    }
    const [formData, setFormData] = useState(editedUser);
    const onFormChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const onSaveProfile = (event) => {
        event.preventDefault();
        saveUser(formData);
    }

    return (
        <form>
            <label>
                userName:
                <input type="text" name="username" value={user.username}></input>
            </label>
            <label>
                password:
                <input type="text" name="password" value={formData.password} onChange={onFormChange}></input>
            </label>
            <label>
                firstName:
                <input type="text" name="firstName" value={formData.firstName} onChange={onFormChange}></input>
            </label>
            <label>
                lastName:
                <input type="text" name="lastName" value={formData.lastName} onChange={onFormChange}></input>
            </label>
            <label>
                Email:
                <input type="text" name="email" value={formData.email} onChange={onFormChange}></input>
            </label>
            <button onClick={onSaveProfile}>Save</button>
        </form>
    )
}

export default Profile;