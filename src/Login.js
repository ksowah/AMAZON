import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import './login.css'
import app from './firebase'
import { useSelector, useDispatch } from 'react-redux'
import { setUserLogin, selectUserName } from './features/user/UserSlice'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const userName = useSelector(selectUserName) 

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

     const auth = getAuth(app);

    const login = (e) => {
        e.preventDefault()
       
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
           history.push('/')
           dispatch(setUserLogin({
            name: userName,
            logedIn: true,
            account: user
        }))
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            alert(errorCode)
        });

    }

    return (
        <div className='login'>
        <Link to='/'>
            <img src='https://th.bing.com/th/id/R.9598b485d75c30986078655d68259c62?rik=V3O9ueSWLI2jWA&pid=ImgRaw&r=0'
                 alt='header logo'  
                 className='login__logo' 
              />
        </Link>

        <div className='login__container'>
            <h1>Sign In</h1>

            <form>
                <h5>E-mail</h5>
                <input type='email' placeholder='Your E-mail' onChange={(e) => setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type='password' placeholder='Your Password' onChange={(e) => setPassword(e.target.value)}/>
                <button className='login__btn' type='submit' onClick={login}>Sign In</button>

                <p>New Amazon user?<Link to='/sign-up'> Sign up now.</Link></p>
            </form>
        </div>

        </div>
    )
}

export default Login
