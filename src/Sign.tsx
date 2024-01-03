import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "./component/Navbar";

function Sign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    //   const currentUser = auth.currentUser;

      setEmail("");
      setPassword("");
      formRef.current?.reset(); // Use optional chaining here
      navigate("/");
    } catch (error) {
      setEmail("");
      setPassword("");
      setError("Invalid email or password");
      formRef.current?.reset(); // Use optional chaining here
    }
  };

  const renderNavbar = () => {
    const currentUser = auth.currentUser;
    return (
      <Navbar
        title={currentUser ? "Notification" : "Login"}
        job="Create Jobs"
      />
    );
  };

  return (
    <div>
      {renderNavbar()}
      <form onSubmit={handleSignIn} ref={formRef}>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-indigo-500">
          <div className="w-full max-w-lg px-4 py-8 mx-auto bg-white border rounded-lg shadow-2xl sm:px-6 lg:px-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">&#128540; Sign up</h3>
              <div>
                <label className="block py-1">Your email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded shadow hover:border-indigo-600 focus:outline-none focus:ring focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block py-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded shadow hover:border-indigo-600 focus:outline-none focus:ring focus:border-indigo-600"
                />
              </div>
              <div className="flex gap-3 pt-3 items-center">
                <button
                  type="submit"
                  className="w-full px-4 py-2 border rounded-lg shadow hover:border-indigo-600 focus:outline-none focus:ring focus:border-indigo-600"
                >
                  Submit
                </button>
              </div>
              <div>
                <span className="text-xs">
                  Note: If you want to reset your password, just enter the email
                  id and click on Reset Password
                </span>
              </div>
              <div>{error && <p className="text-red-500">{error}</p>}</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sign;
