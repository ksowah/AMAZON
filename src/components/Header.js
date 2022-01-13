import React, { useEffect } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserName, selectLogedIn, setSignOut } from '../features/user/UserSlice'
import { getAuth, signOut } from "firebase/auth";
import app from '../firebase'

function Header() {

    const auth = getAuth(app);
    const checkSignOut = useDispatch()

    const logOut = () => {
        signOut(auth).then(() => {
            checkSignOut(setSignOut())
        // Sign-out successful.
        }).catch((error) => {
            alert(error)
        // An error happened.
        });

    }

    const userName = useSelector(selectUserName)
    const userLoggedIn = useSelector(selectLogedIn)

   const [{basket}, dispatch] = useStateValue()

    return (
        <div className='header'>
            <Link to='/'>
                <img className='header__logo'
                    src='https://th.bing.com/th/id/R.8a0202e54a5dec12ead7937a8b422469?rik=bU3K0BWqlSw20A&pid=ImgRaw&r=0'
                    alt='header logo'
                />
            </Link>

            <div className='header__search'>
                <input
                    className='header__search__input'
                    type='text'/>
                <span className='header__search__icon'>
                    <i class="fas fa-search"></i>
                </span>
            </div>

            <div className='header__nav'>

                <div className='header__nav__options'>
                    <span className='header__option__one'>
                        Hello, {userLoggedIn? 'user' : 'Guest'}
                    </span>
                    <Link to= {!userLoggedIn && '/login'}>
                        <span className='header__option__two'>
                            {userLoggedIn? <h4 onClick={logOut}>Sign Out</h4> : 'Sign In'}
                        </span>
                    </Link>
                </div>

                <div className='header__nav__options'>
                <span className='header__option__one'>
                        Returns
                    </span>
                    
                    <span className='header__option__two'>
                        & Orders
                    </span>
                </div>

                <div className='header__nav__options'>
                <span className='header__option__one'>
                        Your
                    </span>
                    
                    <span className='header__option__two'>
                        Prime
                    </span>
                </div>

                <div className='header__nav__basket'>
                    <Link to='/checkout'>
                        <i class="fas fa-cart-plus"></i>
                   
                    
                        <span className='header__basket__count header__option__two'>
                            {basket?.length}
                        </span>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}

export default Header
