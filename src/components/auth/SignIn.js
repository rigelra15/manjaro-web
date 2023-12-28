import React, { useState, useEffect } from 'react'
import { auth, provider } from '../../firebase'
import { useNavigate, Link } from 'react-router-dom'
import logoManjaro from '../../assets/logo-manjaro.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import GoogleButton from 'react-google-button'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const SignIn = () => {
  const [countdown, setCountdown] = useState(5);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let countdownInterval;

    if (user) {
      // Start countdown and redirect to '/dba' after 5 seconds
      let secondsLeft = countdown;
      countdownInterval = setInterval(() => {
        secondsLeft -= 1;
        setCountdown(secondsLeft);

        if (secondsLeft === -1) {
          clearInterval(countdownInterval);
          navigate('/', { replace: true });
        }
      }, 1000); // Update countdown every second
    }

    // Clear interval when the component unmounts
    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown, navigate, user]);

  const signIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Update the user state after successful login
      setUser(auth.currentUser);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user
      console.log(user)
      setUser(user)
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col items-center gap-4'>
        {user ? 
          <>
            <div className='p-8 border-2 shadow-lg rounded-2xl flex flex-col items-center justify-center gap-3'>
              {/* <button className='btn btn-secondary btn-md'
              onClick={handleLogout}>
                Logout
              </button> */}
              <h3 className='text-center'>Welcome <br /> <span className='font-bold'>{user.displayName}</span></h3>
              <div className=''>
                <img src={user.photoURL} alt="user" referrerPolicy='no-referrer' className='rounded-full border-4' />
              </div>
              <p>{user.email}</p>
            </div>
            {countdown > 0 && (
              <p className='text-white px-4 py-2 bg-sky-500 rounded-lg'>Redirecting to Home in <span className='font-bold'>{countdown}</span>s</p>
            )}
          </>
        :
          <>
            <div className='p-8 border-2 rounded-2xl flex flex-col items-center shadow-lg'>
              <Link to='/'>
                <LazyLoadImage
                  src={logoManjaro}
                  alt="manjaro-ph"
                  effect="blur"
                  className='mb-5'
                  width={70}
                />
              </Link>
              <form onSubmit={signIn} className='flex flex-col items-center'>
                <h1 className='mb-3 font-bold'>Log In to your Manjaro Account</h1>
                <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type='submit' className='w-full hover:bg-sky-700 transition-all duration-300 ease-in-out bg-sky-500 py-3 rounded-xl mt-4 text-white'>Login</button>
              </form>
              <div className='flex flex-row justify-between items-center gap-2'>
                <hr className='my-4 w-[120px] border-gray-300' />
                <p className='text-gray-400 my-4'>or</p>
                <hr className='my-4 w-[120px] border-gray-300' />
              </div>
              <button className='hover:bg-gray-100 transition-all duration-300 ease-in-out w-full bg-white border-2 py-3 rounded-xl flex flex-row gap-2 items-center justify-center' onClick={handleGoogleSignIn}>
                <FcGoogle className='w-6 h-6' />
                <p>Google</p>
              </button>
              <button className='mt-3 hover:bg-gray-100 transition-all duration-300 ease-in-out w-full bg-white border-2 py-3 rounded-xl flex flex-row gap-2 items-center justify-center'>
                <FaFacebookF className='w-6 h-6 text-blue-600' />
                <p>Facebook</p>
              </button>
            </div>
            <div className='mt-2'>
              <p>Don't have an Account? <a href="/signup" className='text-sky-500 font-semibold'>Sign Up</a></p>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default SignIn