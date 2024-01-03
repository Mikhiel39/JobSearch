import { useState, ChangeEvent, FormEvent } from "react";
import Navbar from "./component/Navbar";
import { collection, addDoc } from "firebase/firestore";
import db from "./firebase";
import { auth } from "./firebase";

interface FormData {
  jobTitle: string;
  company: string;
  jobDescription: string;
  jobRequirement: string;
  city: string;
  state: string;
  creator_id: string;
}

function Jobform() {
  const currentUser = auth.currentUser;
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    company: "",
    jobDescription: "",
    jobRequirement: "",
    city: "",
    state: "Maharashtra",
    creator_id: currentUser ? currentUser.email || "" : "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const jobsCollection = collection(db, "jobs");
      await addDoc(jobsCollection, {
        job_name: formData.jobTitle,
        Company: formData.company,
        job_description: formData.jobDescription,
        job_requirement: formData.jobRequirement,
        City: formData.city,
        State: formData.state,
        creator_id: currentUser ? currentUser.email || "" : "",
      });

      // Clear the form after submission
      setFormData({
        jobTitle: "",
        company: "",
        jobDescription: "",
        jobRequirement: "",
        city: "",
        state: "Maharashtra",
        creator_id: currentUser ? currentUser.email || "" : "",
      });

      // Optionally, you can show a success message or navigate to another page
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-br">
      <Navbar
        title={currentUser ? "Notification" : "Login"}
        job="Create Jobs"
      />
      <div className="flex items-center mt-20">
        <form className="w-full ml-20 mr-20 mb-20" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-2 mb-6">
            <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-slate-100 text-xs font-bold mb-2"
                htmlFor="jobTitle"
              >
                Job Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="jobTitle"
                type="text"
                placeholder="Name of Job"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label
                className="block uppercase tracking-wide text-slate-100 text-xs font-bold mb-2"
                htmlFor="company"
              >
                Company
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="company"
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-6">
            <div className="w-full px-2">
              <label
                className="block uppercase tracking-wide text-slate-100 text-xs font-bold mb-2"
                htmlFor="jobDescription"
              >
                Job Description
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="jobDescription"
                placeholder="Job Description"
                value={formData.jobDescription}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-6">
            <div className="w-full px-2">
              <label
                className="block uppercase tracking-wide text-slate-100 text-xs font-bold mb-2"
                htmlFor="jobRequirement"
              >
                Job Requirement
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="jobRequirement"
                placeholder="Job Requirement"
                value={formData.jobRequirement}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-slate-100 text-xs font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="city"
                type="text"
                placeholder="Mumbai"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-slate-100 text-xs font-bold mb-2"
                htmlFor="state"
              >
                State
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                  <option>Telangana</option>
                  <option>Delhi</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row space-x-3 mt-7">
            <button
              type="submit"
              className="bg-transparent hover:bg-blue-500 text-slate-100 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Submit
            </button>
            <button
              type="reset"
              className="bg-transparent hover:bg-blue-500 text-slate-100 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() =>
                setFormData({
                  jobTitle: "",
                  company: "",
                  jobDescription: "",
                  jobRequirement: "",
                  city: "",
                  state: "Maharashtra",
                  creator_id: "",
                })
              }
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Jobform;
