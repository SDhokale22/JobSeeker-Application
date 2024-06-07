import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../App.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const {isAuthentication} = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8000/api/v1/job/getAll", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  if (!isAuthentication) {
    navigate("/");
  }

  return (
    <>
      <section className='jobs page'>
        <div className='container'>
          <h1>ALL AVAILABLE JOBS</h1>
          <div className='banner'>
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Jobs