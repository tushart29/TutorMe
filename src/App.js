import { BrowserRouter, Routes, Route, Link, NavLink, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { useState, createContext } from 'react'
// Layouts
import RootLayout from './Layout/RootLayout';



// Pages
import About from './Pages/About';
import Signup, { signUpAction } from './Pages/Signup'
import Signin, { signInAction } from './Pages/Signin'
import NotFound from './Pages/Notfound';
import Home from './Pages/Home'
import Contact from './Pages/Contact';
import Tutors from './Pages/Tutors';
import Profile, { profileInAction } from './Pages/Profile';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="tutors" element={<Tutors />} />
        <Route path="signup" element={<Signup />} action={signUpAction(setIsLoggedIn)} />
        <Route path="signin" element={<Signin />} action={signInAction(setIsLoggedIn)} />
        <Route path="contact" element={<Contact />} />
        <Route path="profile" element={<Profile />} action={profileInAction} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  )
  console.log(isLoggedIn + "in app.js")
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
