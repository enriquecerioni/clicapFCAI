import React from "react";
import { UserState } from "../context/User/UserState";
import { JobState } from "../context/Job/JobState";
import { CertificateState } from "../context/Certificate/CertificateState";
import { PayState } from "./Pay/PayState";
import { AreaState } from "./Area/AreaState";
import { RegisterState } from "./Register/RegisterState";
import { ModalitiesState } from "./Modalities/ModalitiesState";
import { NewsState } from "./News/NewsState";
import { AppState } from "./App/AppState";

export const StateContext = ({ children }) => {
  return (
    <AppState>
      <RegisterState>
        <UserState>
          <ModalitiesState>
            <NewsState>
              <JobState>
                <CertificateState>
                  <AreaState>
                    <PayState>{children}</PayState>
                  </AreaState>
                </CertificateState>
              </JobState>
            </NewsState>
          </ModalitiesState>
        </UserState>
      </RegisterState>
    </AppState>
  );
};
