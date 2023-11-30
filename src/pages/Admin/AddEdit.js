import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddEdit.css';
import fireDb from '../../firebase';
import { toast } from 'react-toastify';
import { storage } from '../../firebase';
import { Helmet } from 'react-helmet';
import { ref, uploadBytes } from 'firebase/storage'
import HeaderAdmin from '../../components/Header';

const initialState = {
  name: '',
  nrp: '',
  email: ''
}

const AddEdit = () => {
  const [state, setState] = useState(initialState)
  const [data, setData] = useState({})
  const [imageUpload, setImageUpload] = useState(null)

  const {name, nrp, email, password} = state
  
  const navigate = useNavigate();
  
  const { id } = useParams();
  
  useEffect(() => {
    fireDb.ref("members").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() })
      } else {
        setData({})
      }
    })

    return () => {
      setData({})
    }
  }, [id])
  
  useEffect(() => {
    if(id) {
      setState({...data[id]})
    } else {
      setState({...initialState})
    }
    
    return () => {
      setState({...initialState})
    }
  }, [id, data])
  
  const handleInputChange = (e) => {
    const {name, value} = e.target
    setState({ ...state, [name]: value })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name || !nrp || !email || !password) {
      toast.error("Please provide value in each input field!")
    } else {
      if (!id) {
        fireDb.ref("members").push(state, (err) => {
          if(err) {
            toast.error(err)
            console.log("ERROR")
          } else {
            toast.success("Member Added Successfully!")
            console.log("ADDED")
          }
        })
      } else {
        fireDb.ref(`members/${id}`).set(state, (err) => {
          if(err) {
            toast.error(err)
            console.log("ERROR")
          } else {
            toast.success("Member Updated Successfully!")
            console.log("ADDED")
          }
        })
      }
      setTimeout(() => navigate('/dba', {replace: true}), 500)
    }
  }
  
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageName = `${nrp}`;
    const imageRef = ref(storage, `images/${imageName}`);
    
    uploadBytes(imageRef, imageUpload)
  };
  
  return (
    <>
      <HeaderAdmin />
      <div className='pt-[100px] flex items-center justify-center'>
        <form className='p-[15px] m-auto max-w-[600px] content-center flex flex-col gap-6' onSubmit={handleSubmit}>
          <div className='flex flex-row gap-5 items-center'>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id='name' name='name' placeholder='Your Name...' value={name || ""} onChange={handleInputChange} />

              <label htmlFor="nrp">NRP</label>
              <input type="number" id='nrp' name='nrp' placeholder='Your NRP...' value={nrp || ""} onChange={handleInputChange} />

              <label htmlFor="email">Email</label>
              <input type="email" id='email' name='email' placeholder='Your Email...' value={email || ""} onChange={handleInputChange} />

              <label htmlFor="password">Password</label>
              <input type="password" id='password' name='password' placeholder='Your Password...' value={password || ""} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="file">Photo</label>
              <input type="file" id='file' name='file' onChange={(event) => {setImageUpload(event.target.files[0])}}/>
            </div>
          </div>
          <input className='w-full' type="submit" value={id ? "Update" : "Save"} onClick={uploadImage} />
        </form>
        <Helmet>
          <title>{id ? 'Edit Member' : 'Add Member'} | Admin</title>
        </Helmet>
      </div>
    </>
  )
}

export default AddEdit