import { useState } from 'react';
import './RegistrationPage.css';


const RegistrationPage = () => {
    const [userName, setUserName] = useState('');
    const[password, setPassword] = useState('');
    async function register(ev){
        ev.preventDefault();
       const response =  await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({userName, password}),
            headers: {'Content-Type' : 'application/json'}
        })
        if(response.status === 200) alert('Registration Successfull.');
        else alert('Registration failed use some other username...')
    }
    return (
        <form className='reg-form' onSubmit={register}>
            <h1 className="reg-head">Registration</h1>
            <input type="text"
                    className='reg-dp'     
                    placeholder="Pick a Display Name"
                    value={userName}
                    onChange={(ev) => {
                        console.log(ev.target.value);
                        setUserName(ev.target.value);
                    }}
            />
            
            <input type="password"
                    className='reg-pass'  
                    placeholder="Password"
                    value={password}
                    onChange={(ev) => {
                        console.log(ev.target.value)
                        setPassword(ev.target.value)
                    }}
            />
            <button className='reg-button' type="submit">Register</button>
        </form>
    )
}

export default RegistrationPage;