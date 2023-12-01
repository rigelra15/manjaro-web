import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home.js';
import Member from './pages/Member.js';
import Achievement from './pages/Achievement.js';
import Profile from './pages/Profile.js';
import DashboardAdmin from './pages/Admin/DashboardAdmin.js';
import AddEdit from './pages/Admin/AddEdit.js';
import View from './pages/Admin/View.js';
import About from './pages/Admin/About.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import SignIn from './components/auth/SignIn.js';
import SignUp from './components/auth/SignUp.js';
import Account from './pages/Portal/Account.js';
import Dashboard from './pages/Portal/Dashboard.js';
import Events from './pages/Portal/Events.js';
import Announcements from './pages/Portal/Announcements.js';
import Settings from './pages/Portal/Settings.js';

const App = () => {
  return (
    <Router>
      <ToastContainer position='top-center' />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route
          path='/portal'
          element={<Navigate to='/portal/dashboard' />}
        />
        <Route path='/portal/dashboard' element={<Dashboard />} />
        <Route path='/portal/account' element={<Account />} />
        <Route path='/portal/events' element={<Events />} />
        <Route path='/portal/announcements' element={<Announcements />} />
        <Route path='/portal/settings' element={<Settings />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/member" element={<Member />} />
        <Route path="/achievement" element={<Achievement />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dba" element={<DashboardAdmin />} />
        <Route path="/dba/add" element={<AddEdit />} />
        <Route path="/dba/update/:id" element={<AddEdit />} />
        <Route path="/dba/view/:id" element={<View />} />
        <Route path="/dba/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;