// import { useState } from "react";
import "../index.css";
// import { collection} from "firebase/firestore";
import { Link } from "react-router-dom";
// import db from "../firebase";
import { auth } from "../firebase";

interface NavbarProps {
  title: string;
  job: string;
}

function Navbar(props: NavbarProps) {
  const currentUser = auth.currentUser;
  // const jobCollection = collection(db, "jobs");
  // const [search, setSearch] = useState<string>("");

  const signOut = async () => {
    try {
      await auth.signOut();
      // Sign-out successful.
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-7">
        <Link
          to="/"
          className="ml-2 text-xl text-neutral-800 dark:text-neutral-200"
        >
          Home
        </Link>
        <Link
          to={currentUser ? "/notification" : "/login"}
          className="ml-2 text-xl text-neutral-800 dark:text-neutral-200"
        >
          {props.title}
        </Link>
        <Link
          to={currentUser ? "/form" : "/login"}
          className="ml-2 text-xl text-neutral-800 dark:text-neutral-200"
        >
          {props.job}
        </Link>
        {currentUser ? null : (
          <>
            <Link
              to="/sign"
              className="ml-2 text-xl text-neutral-800 dark:text-neutral-200"
            >
              Sign in
            </Link>
          </>
        )}
        {currentUser ? (
          <>
            <Link
              to="/login"
              onClick={signOut}
              className="ml-2 text-xl text-neutral-800 dark:text-neutral-200"
            >
              Signout
            </Link>
          </>
        ) : null}
        {/* Add your search input and button here */}
      </div>
    </nav>
  );
}

export default Navbar;
