import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import './login.css'
import app from './firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useDispatch } from 'react-redux'
import { setUserLogin } from './features/user/UserSlice'

function Login() {

      
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const history = useHistory()

    const auth = getAuth(app);
    const db = getFirestore(app);

     async function writeToDataBase() {
        
        try {
                const docRef = await addDoc(collection(db, "users"), {
                    name: name,
                    email: email,
                });
                console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                console.error("Error adding document: ", e);
            }
     }
        // ...
   

    const register = (e) => {
        e.preventDefault()

        createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        history.push('/')
        dispatch(setUserLogin({
            name: name,
            logedIn: true,
            account: user
        }))

         })
    .catch((error) => {
        const errorCode = error.code;
        alert(errorCode)
        // ..
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
            <h1>Sign Up</h1>

            <form>
                <h5>E-mail</h5>
                <input type='email' placeholder='Your E-mail' onChange={(e) => setEmail(e.target.value)}/>


                <h5>Password</h5>
                <input type='password' placeholder='Your Password' onChange={(e) => setPassword(e.target.value)}/>
                <button className='login__btn' type='submit' onClick={register}>Sign Up</button>

                <p>Already Signed up? <Link to='/login'>Sign in.</Link></p>
            </form>
        </div>
               

        </div>
    )
}

export default Login
