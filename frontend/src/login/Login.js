import { useState } from 'react'

const Login = ({login}) => {
    const [formData, setFormData] = useState({});

    const onFormChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        login(formData)
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
            <input type="submit" value="Submit" onClick={onFormSubmit}/>
        </form>
    )
}

export default Login;