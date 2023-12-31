import { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { auth } from "./firebase";
import Navbar from "./component/Navbar";
import Jobcard from "./component/Jobcard";
import db from "./firebase";
import "./index.css";

// Define the type for a job
interface Job {
  id: string;
  job_name: string;
  Company: string;
  City: string;
  State: string;
  job_description: string;
  job_requirement: string;
  creator_id: string;
  // Add other properties as needed
}

function Home_page() {
  const [jobs, setJobs] = useState<Job[]>([]); // Explicitly set the type to Job[]
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const jobsCollection = collection(db, "jobs");
      const unsubscribe = onSnapshot(jobsCollection, (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Job[]; // Cast the result to Job[]
        setJobs(items);
        setLoading(false);
      });
      return unsubscribe;
    };

    fetchJobs();
  }, []);

  const currentUser = auth.currentUser;
  console.log(currentUser?.email);

  const renderNavbar = () => {
    return (
      <Navbar
        title={currentUser ? "Notification" : "Login"}
        job="Create_Jobs"
      />
    );
  };

  return (
    <>
      {renderNavbar()}
      <div className="flex flex-col justify-center min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-br">
        <p className="text-4xl text-center mt-7 text-slate-100">
          Recommended Jobs
        </p>
        {loading && <h1>Loading...</h1>}
        {jobs.map((job) => (
          <Jobcard
            key={job.id}
            jobtitle={job.job_name}
            companyname={job.Company}
            city={job.City}
            state={job.State}
            jobdesc={job.job_description}
            jobreq={job.job_requirement}
            creator_id={job.creator_id}
          />
        ))}
      </div>
    </>
  );
}

export default Home_page;
