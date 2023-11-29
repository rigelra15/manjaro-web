import React, { useState, useEffect } from 'react'
import fireDb from '../../firebase'
import { Link } from 'react-router-dom'
import './Home.css'

const DashboardAdmin = () => {
  const [data, setData] = useState({})

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
  }, [])

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='pt-[100px] flex justify-center'>
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>NRP</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>Password</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope='row'>{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].nrp}</td>
                <td>{data[id].email}</td>
                <td>
                  {showPassword ? (
                    data[id].password
                  ) : (
                    <span className='password-placeholder'>*********</span>
                  )}
                </td>
                <td>
                  <button className='btn btn-toggle' onClick={togglePassword}>
                    {showPassword ? 'Hide Password' : 'Show Password'}
                  </button>
                  <Link to={`/dba/update/${id}`}>
                    <button className='btn btn-edit'>Edit</button>
                  </Link>
                  <button className='btn btn-delete'>Delete</button>
                  <Link to={`/dba/view/${id}`}>
                    <button className='btn btn-view'>View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardAdmin;
