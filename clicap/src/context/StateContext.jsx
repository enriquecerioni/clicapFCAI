import React from "react";
import { UserState } from "../context/User/UserState";
import { JobState } from "../context/Job/JobState";
import { CertificateState } from "../context/Certificate/CertificateState";
import { PayState } from "./Pay/PayState";
import { AreaState } from "./Area/AreaState";
import { RegisterState } from "./Register/RegisterState";

export const StateContext = ({ children }) => {
  return (
    <RegisterState>
      <UserState>
        <JobState>
          <CertificateState>
            <AreaState>
              <PayState>{children}</PayState>
            </AreaState>
          </CertificateState>
        </JobState>
      </UserState>
    </RegisterState>
  );
};
