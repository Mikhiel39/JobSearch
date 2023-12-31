import { Route } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Home from "./Home_page";
import Login from "./Login";
import Jobform from "./Jobform";
import Notification from "./Notification";
import Application_form from "./Application_form";
import Sign from "./Sign";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="form" element={<Jobform />} />
      <Route path="notification" element={<Notification />} />
      <Route path="application" element={<Application_form />} />
      <Route path="sign" element={<Sign />} />
    </Route>
  )
);
