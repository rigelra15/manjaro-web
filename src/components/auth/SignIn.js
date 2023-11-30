import React, { useState } from 'react'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Menggunakan useHistory dari React Router untuk navigasi

  const signIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dba', {replace: true}) // Jika login berhasil, arahkan kembali ke '/'
    } catch (error) {
      // Handle error login
      console.error(error.message);
    }
  };

  return (
    <div className='pt-32 flex justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <form onSubmit={signIn} className='flex flex-col items-center'>
            <h1>Log In to your Account</h1>
            <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type='submit' className='w-full bg-sky-500 py-3 rounded-xl mt-4 text-white'>Login</button>
        </form>
        <div>
          <p>New User? <a href="/signup" className='text-sky-500 font-semibold'>Sign Up</a></p>
        </div>
      </div>
    </div>
  )
}

export default SignIn