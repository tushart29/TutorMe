import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import About from './Pages/About';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import NotFound from './Pages/Notfound';
import Home from './Pages/Settings';
import Tutors from './Pages/Tutors';
import Profile from './Pages/Profile';
import RootLayout from './Layout/RootLayout';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer'
import Settings from './Pages/Settings';
import AdditionalInfo from './Pages/AdditionalInfo';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // State to hold the user ID
  const [userState, setUserState] = useState(null); // State to hold the user ID

  console.log("App.js", userId)

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="App">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="settings" element={<Settings userId={userId} />} />
          <Route path="tutors" element={<Tutors setUserState={setUserState} isLoggedIn={isLoggedIn} />} />
          <Route path="signup" element={<Signup setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />} />
          <Route path="signin" element={<Signin setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />} />
          <Route path="profile" element={<Profile userId={userId} />} />
          <Route path="additional-info" element={<AdditionalInfo userState={userState} />} />



          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
