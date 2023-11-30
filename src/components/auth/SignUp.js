import React, { useState } from 'react'
import { auth } from '../../firebase'
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import logoManjaro from '../../assets/logo-manjaro.png';
import { LazyLoadImage } from 'react-lazy-load-image-component'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = (e) => {
      e.preventDefault()
      createUserWithEmailAndPassword(auth, email, password)
    }
  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <div className='flex flex-col items-center gap-4'>
          <>
            <div className='p-8 border-2 rounded-2xl flex flex-col items-center shadow-lg'>
              <form onSubmit={signUp} className='flex flex-col items-center'>
                <Link to='/'>
                  <LazyLoadImage
                    src={logoManjaro}
                    alt="manjaro-ph"
                    effect="blur"
                    className='mb-5'
                    width={70}
                  />
                </Link>
                <h1 className='mb-3 font-semibold'>Create a Manjaro Account</h1>
                <input type="email" placeholder='Enter your Name' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="email" placeholder='Enter your NRP' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type='submit' className='hover:bg-sky-700 transition-all duration-300 ease-in-out w-full bg-sky-500 py-3 rounded-xl mt-2 text-white' >Sign Up</button>
              </form>
              {/* <GoogleButton className='mt-8 rounded-xl'/> */}
              {/* <button className='mt-8'>Sign Up</button> */}
            </div>
            <div>
              <p>Already Have a Account? <a href="/signin" className='hover:text-sky-700 transition-all duration-300 ease-in-out text-sky-500 font-semibold'>Sign In</a></p>
            </div>
          </>
        </div>
      </div>
    </>
  )
}

export default SignUp