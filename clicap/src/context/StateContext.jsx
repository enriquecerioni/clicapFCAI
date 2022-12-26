import React from "react";
import { UserState } from "../context/User/UserState";
import { JobState } from "../context/Job/JobState";
import { CertificateState } from "../context/Certificate/CertificateState";

export const StateContext = ({ children }) => {
  return (
    <UserState>
      <JobState>
        <CertificateState>{children}</CertificateState>
      </JobState>
    </UserState>
  );
};
