import React from "react";
import { UserState } from "../context/User/UserState";
import { JobState } from "../context/Job/JobState";
import { CertificateState } from "../context/Certificate/CertificateState";
import { PayState } from "./Pay/PayState";
import { AreaState } from "./Area/AreaState";

export const StateContext = ({ children }) => {
  return (
    <UserState>
      <JobState>
        <CertificateState>
          <AreaState>
            <PayState>{children}</PayState>
          </AreaState>
        </CertificateState>
      </JobState>
    </UserState>
  );
};
