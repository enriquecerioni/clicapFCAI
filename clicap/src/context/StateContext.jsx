import React from "react";
import { UserState } from "../context/User/UserState";
import { JobState } from "../context/Job/JobState";
import { CertificateState } from "../context/Certificate/CertificateState";
import { PayState } from "./Pay/PayState";

export const StateContext = ({ children }) => {
  return (
    <UserState>
      <JobState>
        <CertificateState>
            <PayState>{children}</PayState>
          </CertificateState>
      </JobState>
    </UserState>
  );
};
