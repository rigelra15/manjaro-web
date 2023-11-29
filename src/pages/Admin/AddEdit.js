import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddEdit.css';
import fireDb from '../../firebase';
import { toast } from 'react-toastify';

const initialState = {
  name: '',
  nrp: '',
  email: ''
}

const AddEdit = () => {
  const [state, setState] = useState(initialState)
  const [data, setData] = useState({})

  const {name, nrp, email, password} = state

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setState({ ...state, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name || !nrp || !email || !password) {
      toast.error("Please provide value in each input field!")
    } else {
      fireDb.ref("members").push(state, (err) => {
        if(err) {
          toast.error(err)
          console.log("ERROR")
        } else {
          toast.success("Member Added Successfully!")
          console.log("ADDED")
        }
      })
      setTimeout(() => navigate('/dba', {replace: true}), 500)
    }
  }


  return (
    <div className='pt-[100px]'>
        <form className='p-[15px] m-auto max-w-[400px] content-center' onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id='name' name='name' placeholder='Your Name...' value={name} onChange={handleInputChange} />

          <label htmlFor="nrp">NRP</label>
          <input type="number" id='nrp' name='nrp' placeholder='Your NRP...' value={nrp} onChange={handleInputChange} />

          <label htmlFor="email">Email</label>
          <input type="email" id='email' name='email' placeholder='Your Email...' value={email} onChange={handleInputChange} />

          <label htmlFor="password">Password</label>
          <input type="password" id='password' name='password' placeholder='Your Password...' value={password} onChange={handleInputChange} />

          <input type="submit" value="Save" />
        </form>
    </div>
  )
}

export default AddEdit