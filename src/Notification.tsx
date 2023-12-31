import { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  query,
  where,
  Unsubscribe,
} from "firebase/firestore";
import { auth } from "./firebase";
import db from "./firebase";
import NotificationCard from "./component/NotificationCard";
import Navbar from "./component/Navbar";

interface NotificationData {
  id: string;
  fname: string;
  lname: string;
  branch: string;
  uname: string;
  skill: string;
  phone: string;
  emailid: string;
  FirstName: string;
  LastName: string;
  Branch: string;
  UniversityName: string;
  Skills: string;
  PhoneNumber: string;
  EmailID: string;
}

export default function Notification() {
  const currentUser = auth.currentUser;
  const [notification, setNotification] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = () => {
      setLoading(true);
      const currentUser = auth.currentUser;
      console.log(currentUser?.email)

      if (currentUser?.email) {
        const noti = query(
          collection(db, "notifications"),
          where("creator_id", "==", currentUser.email)
        );
        const unsubscribe: Unsubscribe = onSnapshot(noti, (querySnapshot) => {
          const items = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as NotificationData[];
          setNotification(items);
          setLoading(false);
        });

        return unsubscribe;
      }

      // If currentUser is undefined, return a dummy function
      return () => {};
    };

    // Call the fetchNotifications function
    const unsubscribe = fetchNotifications();

    // Cleanup function
    return () => {
      // Ensure that unsubscribe is a function before calling it
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [currentUser?.email]);

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
        <p className="text-4xl text-center mt-14 text-slate-100">
          Notification
        </p>
        {loading && <h1>Loading...</h1>}
        {notification.map((notificat) => (
          <NotificationCard
            id={notificat.id}
            fname={notificat.FirstName}
            lname={notificat.LastName}
            branch={notificat.Branch}
            uname={notificat.UniversityName}
            skill={notificat.Skills}
            phone={notificat.PhoneNumber}
            emailid={notificat.EmailID}
          />
        ))}
      </div>
    </>
  );
}
