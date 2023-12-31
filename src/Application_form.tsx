import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "./firebase";
import { auth } from "./firebase";
import Navbar from "./component/Navbar";
import { useSearchParams } from "react-router-dom";
import "./index.css";

const ApplicationForm = () => {
  const [searchparams] = useSearchParams()!;
  const creatorId = searchparams.get("id");
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    UniversityName: "",
    PhoneNumber: "",
    EmailID: "",
    Branch: "",
    Skills: "",
  });

  const currentUser = auth.currentUser;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const jobsCollection = collection(db, "notifications");
      await addDoc(jobsCollection, {
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        UniversityName: formData.UniversityName,
        PhoneNumber: formData.PhoneNumber,
        EmailID: formData.EmailID,
        Branch: formData.Branch,
        Skills: formData.Skills,
        creator_id: creatorId,
      });

      // Clear the form after submission
      setFormData({
        FirstName: "",
        LastName: "",
        UniversityName: "",
        PhoneNumber: "",
        EmailID: "",
        Branch: "",
        Skills: "",
      });

      // Optionally, you can show a success message or navigate to another page
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const renderNavbar = () => {
    return (
      <Navbar
        title={currentUser ? "Notification" : "Login"}
        job="Create_Jobs"
      />
    );
  };

  return (
    <div>
      {renderNavbar()}
      <div className="flex flex-col justify-center min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-br">
        <div className="flex items-center mt-20">
          <form className="w-full ml-20 mr-20 mb-20" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-2 mb-6">
              <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-slate-100 text-xs font-bold mb-2"
                  htmlFor="jobTitle"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="FirstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.FirstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label
                  className="block uppercase tracking-wide text-slate-100 text-xs font-bold mb-2"
                  htmlFor="company"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="LastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.LastName}
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
                  University Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="UniversityName"
                  type="text" // Change the input type to "text"
                  placeholder="University Name"
                  value={formData.UniversityName}
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
                  Branch
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Branch"
                  type="text" // Change the input type to "text"
                  placeholder="Branch"
                  value={formData.Branch}
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
                  Skills
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Skills"
                  type="text" // Change the input type to "text"
                  placeholder="Skills"
                  value={formData.Skills}
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
                  EmailID
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="EmailID"
                  type="email" // Change the input type to "text"
                  placeholder="EmailID"
                  value={formData.EmailID}
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
                  PhoneNumber
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="PhoneNumber"
                  type="tel" // Change the input type to "text"
                  placeholder="Phone Number"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  required
                />
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
                    FirstName: "",
                    LastName: "",
                    UniversityName: "",
                    PhoneNumber: "",
                    EmailID: "",
                    Branch: "",
                    Skills: "",
                  })
                }
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
