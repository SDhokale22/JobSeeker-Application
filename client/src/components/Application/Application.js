import React, { useContext, useState } from 'react'
import { Context } from '../../index';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const {isAuthentication, user} = useContext(Context);

  const navigate = useNavigate();

  //handle file 
  const handleFileChange = (e) => {
    const resume = e.target.files[0];
    setResume(resume);
  };

  const {id} = useParams();

  const handleApplication = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const {data} = await axios.post("http://localhost:8000/api/v1/application/post", formData, 
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setName("");
      setEmail("");
      setPhone("");
      setCoverLetter("");
      setAddress("");
      setResume("");

      toast.success(data.message);

      navigate("/job/getAll");
    } catch (error) {
      toast.error(error.response.data.message);
    }

  };

  if(!isAuthentication || (user && user.role === "Employer")){
    navigate("");
  }

  return (
   <section className='application'>
    <div className='container'>
      <h3>Application Form</h3>
      <form onSubmit={handleApplication}>
        <input 
        type='text' 
        placeholder='Enter your Name' 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        />
         <input 
        type='text' 
        placeholder='Enter your Email' 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        />
         <input 
        type='number' 
        placeholder='Enter your Phone' 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        />
         <input 
        type='text' 
        placeholder='Enter your Address' 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        />
        <textarea 
        value={coverLetter} 
        onChange={(e) => setCoverLetter(e.target.value)} 
        placeholder='Cover Letter'  
        />
        <div>
          <label 
          style={{
            textAlign: "start", 
            display: "block", 
            fontSize: "20px"
            }}>
              Select resume
            </label>
            <input 
            type='file' 
            accept='.jpg, .png, .webp'
            onChange={handleFileChange}  
            style={{width: "100%"}}
            />
        </div>

        <button type='submit'>Send Application</button>
      </form>
    </div>
   </section>
  )
}

export default Application