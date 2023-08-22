import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    
    useEffect(() => {
        fetch('http://localhost:4000/profile',{
            credentials:'include'
        }).then(response => {
            
            response.json().then(userInfo => {
                 
                setUserInfo(userInfo)
            })
        })
    },[]);

    function logout(){
        fetch('http://localhost:4000/logout', {
            credentials:'include',
            method:'POST'
        })
        setUserInfo(null);
        
    }
    const userName = userInfo?.userName;
    return (
        <header>
            <Link to="/" className="blog_logo">MyBlog</Link>
            <nav>
                {userName && (
                    <>
                        <Link to='/create'>Create new post</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                )}
                {!userName && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/registration">Register</Link>  
                    </>
                )

                }
                
            </nav>
      </header>
    )
}

export default Header;