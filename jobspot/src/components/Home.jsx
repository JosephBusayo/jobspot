import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import '../styles/Detail.css'
import { Navbar } from './Navbar'



export function Home() {
  const [data, setData] = useState({});
  const [jobDetails, setJobDetails] = useState()


  const base_url = "http://localhost:4001/jobs"

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(base_url);
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);
  const { payload, display } = data

  const handleJobDetail = async (id) => {
    const response = await fetch(`${base_url}/${id}`);
    const detail = await response.json();
    setJobDetails(detail);
    console.log(jobDetails)
  };



  return (
    <>
      <Navbar navDisplayed={display} />

      <section className="home">
        <section className="jobs-section">
          {payload && payload.map((job) => (
            <div className="job" key={job._id} onClick={() => handleJobDetail(job._id)}>

              <div className='job-loc-wrapper'>
                <div className='loc-icon'><img src="/assets/loc-image.png" alt="loc-icon" /></div>
                <p className='job-loc'>{job.company}</p>
              </div>

              <h2 className='job-title'>{job.title}</h2>

              <div className='job-tag-wrapper'>
                <div className='tag-icon'><img src="/assets/tag-image.png" alt="tag-icon" /></div>
                <p className='job-tag'>{job.tag}</p>
              </div>

              <div className='job-salary'>{job.salary}</div>

              <p className='job-type'>{job.type}</p>

              <p className='job-date'>
                {`Posted ${Math.floor((new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24))} `}
                <span> days ago</span>
              </p>

            </div>
          ))}
        </section>

        {/*         <section className="filter-box">
          <h4>Filter</h4>
          <form>
            <input type="text" id="filter-by-tag" name="filter-by-tag" placeholder="e.g Remote, Hybrid" />
            <button>Search</button>
          </form>
        </section> */}

        <section className="job-details-section">
          {jobDetails && (
            <div className="job-details">
              <h2 className="job-title">{`${jobDetails.payload.title} at ${jobDetails.payload.company}`}</h2>

              <section>
                <div className='job-loc-wrapper'>
                  <div className='icon'><img src="/assets/tag.png" alt="tag-icon" /></div>
                  <p className='desc'>{jobDetails.payload.tag}</p>
                </div>

                <div className='job-loc-wrapper'>
                  <div className='icon'><img src="/assets/loc.png" alt="tag-icon" /></div>
                  <p className='desc'>{jobDetails.payload.type}</p>
                </div>

                <div className='loc-apply-wrapper'>
                  <div className='job-loc-wrapper'>
                    <div className='icon'><img src="/assets/money.png" alt="tag-icon" /></div>
                    <p className='desc'>{jobDetails.payload.salary}</p>
                  </div>

                  <button className='btn menu-btn post-job-btn' >Apply</button>
                </div>
              </section>

              <section className='desc-details'>
                <div>
                  <h5>Job Description</h5>
                  <p>{jobDetails.payload.desc}</p>
                </div>
                <div>
                  <h5>What you'll do</h5>
                  <p>{jobDetails.payload.todo}</p>
                </div>
                <div>
                  <h5>Requirements</h5>
                  <p>{jobDetails.payload.req}</p>
                </div>
              </section>
            </div>
          )}
        </section>
      </section>
    </>

  )
}
