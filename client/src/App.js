import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Application from './components/Application/Application';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home/Home';
import JobDetails from './components/Job/JobDetails';
import Jobs from './components/Job/Jobs';
import MyJobs from './components/Job/MyJobs';
import PostJob from './components/Job/PostJob';
import Footer from './components/Layout/Footer';
import Navbar from './components/Layout/Navbar';
import NotFound from './components/NotFound/NotFound';
import {Toaster} from "react-hot-toast";
import { useContext, useEffect } from 'react';
import { Context } from './index';
import axios from "axios";
import MyApplication from './components/Application/MyApplication';

const App = () => {
  const {isAuthentication, setIsAuthentication, setUser} = useContext(Context);

  useEffect(() => {
    const fetchUser = async() => {
      try{
        const response = await axios.get("http://localhost:8000/api/v1/user/getUser", {withCredentials: true});
        setUser(response.data.user);
        setIsAuthentication(true);
      }catch(error){
        setIsAuthentication(false);
      }
    };
    fetchUser();
  }, [isAuthentication]);


  return (
    <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/' element={<Home />}/>
        <Route path='/job/getall' element={<Jobs />}/>
        <Route path='/job/:id' element={<JobDetails />}/>
        <Route path='/job/post' element={<PostJob />}/>
        <Route path='/job/me' element={<MyJobs />}/>
        <Route path='/application/:id' element={<Application />}/>
        <Route path='/application/me' element={<MyApplication />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
    </>
      
  );
}

export default App;
