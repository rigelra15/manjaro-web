import React, { useState } from 'react'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = (e) => {
      e.preventDefault()
      createUserWithEmailAndPassword(auth, email, password)
    }
  return (
    <div className='pt-32 flex justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <form onSubmit={signUp} className='flex flex-col items-center'>
            <h1>Create Account</h1>
            <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type='submit' className='w-full bg-sky-500 py-3 rounded-xl mt-4 text-white' >Sign Up</button>
        </form>
        {/* <GoogleButton className='mt-8 rounded-xl'/> */}
        {/* <button className='mt-8'>Sign Up</button> */}
        <div>
          <p>Already Have a Account? <a href="/signin" className='text-sky-500 font-semibold'>Sign In</a></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp