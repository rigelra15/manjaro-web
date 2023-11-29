// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
        
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import HeaderAdmin from './components/Header.js';

const App = () => {
  return (
    <Router>
      <ToastContainer position='top-center' />
      <HeaderAdmin />
      <Routes>
        <Route path="/" element={<Home />} />
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
