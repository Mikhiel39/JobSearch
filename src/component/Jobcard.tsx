import { createSearchParams, useNavigate } from "react-router-dom";

interface JobcardProps {
  creator_id?: string; // Assuming creator_id is a string
  jobtitle: string;
  companyname: string;
  city: string;
  state: string;
  jobdesc: string;
  jobreq: string;
}

function Jobcard(props: JobcardProps) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (props.creator_id) {
      // No need to useNavigate, use Link to navigate and pass creator_id as state
      navigate({
        pathname: "/application",
        search: createSearchParams({
          id: props.creator_id,
        }).toString(),
      });
    } else {
      console.error("Creator information is missing or incomplete.");
    }
  };

  return (
    <div className="m-7">
      <div className="rounded-md w-full bg-white px-4 py-4 shadow-md transition transform duration-500 cursor-pointer">
        <div className="flex flex-col justify-start">
          <div className="flex justify-between items-center w-96">
            <div className="text-lg font-semibold text-bookmark-blue flex space-x-1 items-center mb-2">
              <svg
                className="w-7 h-7 text-gray-700"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG Path */}
              </svg>
              <span>{props.jobtitle}</span>
            </div>
            <span className="bg-green-500 rounded-full uppercase text-white text-sm px-4 py-1 font-bold shadow-xl">
              {" "}
              {props.companyname}{" "}
            </span>
          </div>
          <div className="text-sm text-gray-500 flex space-x-1 items-center">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG Path */}
            </svg>
            <span>
              {props.city}, {props.state}
            </span>
          </div>
          <div>
            <h3 className="pt-3">Job Description :</h3>
            <p className="pt-2">{props.jobdesc}</p>
            <h3 className="pt-3">Job Requirement : {props.jobreq}</h3>
          </div>
          <div>
            <div className="mt-5">
              <button
                className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer"
                onClick={handleSubmit}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobcard;
