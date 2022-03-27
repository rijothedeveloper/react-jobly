import { useState } from 'react'
import JoblyApi from '../api';
import './signup.css'
const SignUp = () => {
    const [formData, setFormData] = useState({});
    const onFormChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        JoblyApi.registerUser(formData);
    }

    return(
        <form>
            <label>
                userName:
                <input type="text" name="username" value={formData.username} onChange={onFormChange}></input>
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
            <input type="submit" value="Submit" onClick={onFormSubmit}/>
        </form>
    )
}

export default SignUp;