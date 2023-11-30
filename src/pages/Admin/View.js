import React, { useState, useEffect } from 'react';
import fireDb from '../../firebase';
import bgMember from '../../assets/bgMember20-Black.png'
import logoWhite from '../../assets/logoWhite.png'
import { useParams, Link } from 'react-router-dom';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { FaArrowLeft } from 'react-icons/fa6';
import './View.css';

const View = () => {
  const [user, setUser] = useState({});
  const [userImageUrl, setUserImageUrl] = useState(null);

  const imageListRef = ref(storage, "images/");

  const { id } = useParams();

  useEffect(() => {
    fireDb.ref(`members/${id}`).get().then((snapshot) => {
      if (snapshot.exists()) {
        setUser({ ...snapshot.val() });
      } else {
        setUser({});
      }
    });
  }, [id]);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      const userImageName = `${user.nrp}`;
      const userImage = response.items.find((item) => item.name === userImageName);
      if (userImage) {
        getDownloadURL(userImage).then((url) => {
          setUserImageUrl(url);
        });
      }
    });
  }, [user.nrp, imageListRef]);

  return (
    <div className='pt-[150px] flex flex-col gap-3 items-center justify-center'>
      <div className='p-6 rounded-xl border-2'>
        <div className="flex flex-row items-center justify-center">
          <div>
            {userImageUrl && (
              <>
                <img src={userImageUrl} alt={`Profile of ${user.name}`} width={320} className='w-[280px] h-[370px] rounded-lg object-cover bg-sky-500' style={{ backgroundImage: `url(${bgMember})`, backgroundSize: 'cover'}} />
              </>
            )}
          </div>
            <img
              src={logoWhite}
              alt="Logo"
              className="absolute top-5 left-5 z-50 w-16 p-2"
            />
          <div className='ml-7'>
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
          </div>
        </div>
      </div>
      <div>
        <Link to={'/dba'}>
          <button className='px-3 py-2 bg-sky-500 flex flex-row gap-2 items-center justify-center text-white rounded-xl'>
            <FaArrowLeft />
            <p>Go Back</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default View;
