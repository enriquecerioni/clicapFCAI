import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Welcome from "../components/Welcome/Welcome";
import Start from "../components/Start/Start";
import AccountActivate from "../components/AccountActivate/AccountActivate";
import DeliveryTask from "../components/DeliveryTask/DeliveryTask";
import JobsAdmin from "../components/Jobs/JobsAdmin/JobsAdmin";
import Users from "../components/Users/Users";
import JobStudent from "../components/Jobs/JobsStudent/JobStudent";
import Sidebar from "../components/Sidebar/SideBar";
import PrivateAdminRoute from "./PrivateAdminRoute";
import { JobInformation } from "../components/Jobs/JobInformation/JobInformation";
import { Corrections } from "../components/Jobs/Corrections/Corrections";
import PayStudent from "../components/Payment/PaysStudent/PayStudent";
import PayReceipt from "../components/UploadReceipt/PayReceipt/PayReceipt";
import PaysAdmin from "../components/Payment/PaysAdmin/PaysAdmin";
import StudentCertificate from "../components/StudentCertificate/Student/StudentCertificate";
import Certificate from "../components/UploadStudentCertificate/Certificate";
import UpdateInvoce from "../components/Payment/PaysAdmin/UpdateInvoice";
import { SendCorrectionAdmin } from "../components/Jobs/SendCorrectionAdmin/SendCorrectionAdmin";
const CustomRoute = () => (
  <>
  <br /><br />
    <Routes>
        <Route path="/" element={<Home><Start/></Home>} />
        <Route element={<Home />} />
        <Route path="login" element={<Home><Login/></Home>} />
        <Route path="newjob" element={<PrivateRoute><DeliveryTask/></PrivateRoute>} />
        <Route path="newpay" element={<PrivateRoute><PayReceipt/></PrivateRoute>} />
        <Route path="pay/edit/:id" element={<PrivateRoute><UpdateInvoce/></PrivateRoute>} />
        <Route path="newcertificate" element={<PrivateRoute><Certificate/></PrivateRoute>} />
        <Route path="jobs" element={<PrivateAdminRoute><JobsAdmin/></PrivateAdminRoute>} />
        <Route path="job/correctionstosend/:id" element={<PrivateAdminRoute><SendCorrectionAdmin/></PrivateAdminRoute>} />
        <Route path="job/:id" element={<PrivateRoute><JobInformation/></PrivateRoute>} />
        <Route path="job/corrections/:id" element={<PrivateRoute><Corrections/></PrivateRoute>} />
        <Route path="myjobs" element={<PrivateRoute><JobStudent/></PrivateRoute>} />
        <Route path="student" element={<PrivateRoute><StudentCertificate/></PrivateRoute>} />
        <Route path="pays" element={<PrivateAdminRoute><PaysAdmin/></PrivateAdminRoute>} />
        <Route path="mypays" element={<PrivateRoute><PayStudent/></PrivateRoute>} />
        <Route path="users" element={<PrivateAdminRoute><Users/></PrivateAdminRoute>} />
        <Route path="register" element={<Home><Register/></Home>} />
        <Route path="api/clicap/user/acount-activate/:token" element={<AccountActivate />} />
        <Route path="home" element={<PrivateRoute><Welcome/></PrivateRoute>} />
        <Route path="user/edit/:id" element={<PrivateRoute><Register/></PrivateRoute>} />
        {/* <Route path="users">
          <Route index element={<ListUser />} />
          <Route path=":userId" element={<SingleUser />} />
          <Route path="new" element={<NewUser />} />
        </Route> */}
    </Routes>
  </>
);

export default CustomRoute;
