import React from "react";

export interface NotificationCardProps {
  id: string;
  fname: string;
  lname: string;
  uname: string;
  branch: string;
  skill: string;
  phone: string;
  emailid: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  id,
  fname,
  lname,
  branch,
  uname,
  skill,
  phone,
  emailid,
}) => {
  const baseClass =
    "block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-blue-gray-600 to-blue-gray-400";

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 align-center">
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          </h5>
          <p className={baseClass}>First Name: {fname}</p>
          <p className={baseClass}>Last Name: {lname}</p>
          <p className={baseClass}>University Name: {uname}</p>
          <p className={baseClass}>Branch: {branch}</p>
          <p className={baseClass}>Skills: {skill}</p>
          <p className={baseClass}>Phone Number: {phone}</p>
          <p className={baseClass}>Email id: {emailid}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
