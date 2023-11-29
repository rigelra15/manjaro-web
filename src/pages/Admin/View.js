import React, { useState, useEffect } from 'react'
import fireDb from '../../firebase'
import { useParams, useNavigate, Link } from 'react-router-dom'
import './View.css'

const View = () => {
  const [user, setUser] = useState({})

  const {id} = useParams()

  useEffect(() => {
    fireDb.ref(`members/${id}`).get().then((snapshot) => {
      if (snapshot.exists()) {
        setUser({...snapshot.val()})
      } else {
        setUser({})
      }
    })
  }, [id])

  console.log("user", user)
  return (
    <div className='pt-[150px] flex justify-center'>
        <div className='card rounded-xl'>
          <div className='card-header'>
            <p>Member Detail</p>
          </div>
          <div className="container text-center">
            <strong>ID: </strong>
            <span>{id}</span>
            <br />
            <br />
            <strong>Name: </strong>
            <span>{user.name}</span>
            <br />
            <br />
            <strong>NRP: </strong>
            <span>{user.nrp}</span>
            <br />
            <br />
            <strong>Email: </strong>
            <span>{user.email}</span>
            <br />
            <br />
            <Link to={'/dba'}>
              <button className='btn btn-edit'>Go Back</button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default View