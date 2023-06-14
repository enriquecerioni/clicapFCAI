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
import { UserState } from "../context/User/UserState";
import CertificatesUser from "../components/CertificatesUser/CertificatesUser";
import { News } from "../components/News/News";
import { GenerateCertificate } from "../components/GenerateCertificate/GenerateCertificate";
import { NewCertificate } from "../components/GenerateCertificate/NewCertificate/NewCertificate";
import CertificateTypes from "../components/GenerateCertificate/CertificateTypes";
import { Configuration } from "../components/Configuration/Configuration";
import StudentCertificateAdmin from "../components/StudentCertificate/Admin/StudentCertificateAdmin";
import { PageInProcess } from "../components/PageInProcess/PageInProcess";
import { ScientificCommitte } from "../views/ScientificCommittee/ScientificCommittee";
import { OrganizingCommittee } from "../views/OrganizingCommittee/OrganizingCommittee";
import { Sponsors } from "../views/Sponsors/Sponsors";
import { ImportantDate } from "../views/ImportantDate/ImportantDate";
import { ImportantDateTable } from "../components/ImportantDateManager/ImportantDateTable";
import { Areas } from "../components/Areas/Areas";
import { LogoConfig } from "../components/Configuration/LogoConfig/LogoConfig";
import { Area } from "../views/Area/Area";
import { Modalities } from "../views/Modalities/Modalities";
import { SponsorTable } from "../components/Sponsor/SponsorManager/SponsorTable";
import { Institutional } from "../views/Institutional/Institutional";
import { Contact } from "../views/Contact/Contact";
import { Exposition } from "../views/Exposition/Exposition";
import { Payment } from "../views/Payment/Payment";

const CustomRoute = () => (
  <>
    <Routes>
      <Route
        path="/"
        element={
          <Home>
            <Start />
          </Home>
        }
      />

      <Route element={<Home />} />

      <Route
        path="login"
        element={
          <Home>
            <Login />
          </Home>
        }
      />

      <Route
        path="news"
        element={
          <Home>
            <News />
          </Home>
        }
      />

      <Route
        path="sponsors"
        element={
          <Home>
            <Sponsors />
          </Home>
        }
      />

      <Route
        path="institutional"
        element={
          <Home>
            <Institutional />
          </Home>
        }
      />

      <Route
        path="scientific-committee"
        element={
          <Home>
            <ScientificCommitte />
          </Home>
        }
      />

      <Route
        path="organizing-committee"
        element={
          <Home>
            <OrganizingCommittee />
          </Home>
        }
      />

      <Route
        path="importantdates"
        element={
          <Home>
            <ImportantDate />
          </Home>
        }
      />

      <Route
        path="areas"
        element={
          <Home>
            <Area />
          </Home>
        }
      />

      <Route
        path="modalities"
        element={
          <Home>
            <Modalities />
          </Home>
        }
      />

      <Route
        path="expositions"
        element={
          <Home>
            <Exposition />
          </Home>
        }
      />

      <Route
        path="payments"
        element={
          <Home>
            <Payment />
          </Home>
        }
      />

      <Route
        path="institutional"
        element={
          <Home>
            <Institutional />
          </Home>
        }
      />

      <Route
        path="sponsors"
        element={
          <Home>
            <Sponsors />
          </Home>
        }
      />

      <Route
        path="contact"
        element={
          <Home>
            <Contact />
          </Home>
        }
      />

      <Route
        path="newjob"
        element={
          <PrivateRoute>
            <DeliveryTask />
          </PrivateRoute>
        }
      />

      <Route
        path="myjob/:id"
        element={
          <PrivateRoute>
            <DeliveryTask />
          </PrivateRoute>
        }
      />

      <Route
        path="configuration"
        element={
          <PrivateAdminRoute>
            <Configuration />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="logos-config"
        element={
          <PrivateAdminRoute>
            <LogoConfig />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="importantdate-config"
        element={
          <PrivateAdminRoute>
            <ImportantDateTable />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="sponsor-config"
        element={
          <PrivateAdminRoute>
            <SponsorTable />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="area-config"
        element={
          <PrivateAdminRoute>
            <Areas />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="newpay"
        element={
          <PrivateRoute>
            <PayReceipt />
          </PrivateRoute>
        }
      />

      <Route
        path="pay/edit/:id"
        element={
          <PrivateRoute>
            <UpdateInvoce />
          </PrivateRoute>
        }
      />

      <Route
        path="newcertificate"
        element={
          <PrivateRoute>
            <Certificate />
          </PrivateRoute>
        }
      />

      <Route
        path="jobs"
        element={
          <PrivateAdminRoute>
            <JobsAdmin />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="jobs/job/edit/:id"
        element={
          <PrivateAdminRoute>
            <DeliveryTask />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="job/correctionstosend/:id/:correctionNumber"
        element={
          <PrivateAdminRoute>
            <SendCorrectionAdmin />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="job/:id"
        element={
          <PrivateRoute>
            <JobInformation />
          </PrivateRoute>
        }
      />

      <Route
        path="job/corrections/:id"
        element={
          <PrivateRoute>
            <Corrections />
          </PrivateRoute>
        }
      />

      <Route
        path="myjobs"
        element={
          <PrivateRoute>
            <JobStudent />
          </PrivateRoute>
        }
      />

      <Route
        path="mycertificates"
        element={
          <PrivateRoute>
            <CertificatesUser />
          </PrivateRoute>
        }
      />

      <Route
        path="generate-certificate"
        element={
          <PrivateAdminRoute>
            <GenerateCertificate />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="certificate-types"
        element={
          <PrivateAdminRoute>
            <CertificateTypes />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="new-certificate-type"
        element={
          <PrivateAdminRoute>
            <NewCertificate />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="edit-certificate-type/:certificateId"
        element={
          <PrivateAdminRoute>
            <NewCertificate />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="certificates"
        element={
          <PrivateAdminRoute>
            <StudentCertificateAdmin />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="student"
        element={
          <PrivateRoute>
            <StudentCertificate />
          </PrivateRoute>
        }
      />

      <Route
        path="pays"
        element={
          <PrivateAdminRoute>
            <PaysAdmin />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="mypays"
        element={
          <PrivateRoute>
            <PayStudent />
          </PrivateRoute>
        }
      />

      <Route
        path="users"
        element={
          <PrivateAdminRoute>
            <Users />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="register"
        element={
          <Home>
            <UserState>
              <Register />
            </UserState>
          </Home>
        }
      />

      <Route
        path="page-in-process"
        element={
          <Home>
            <PageInProcess />
          </Home>
        }
      />

      <Route
        path="fcai/user/acount-activate/:token"
        element={<AccountActivate />}
      />

      <Route
        path="home"
        element={
          <PrivateRoute>
            <Welcome />
          </PrivateRoute>
        }
      />

      <Route
        path="user/edit/:id"
        element={
          <PrivateRoute>
            <Register />
          </PrivateRoute>
        }
      />
    </Routes>
  </>
);

export default CustomRoute;
