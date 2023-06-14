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
import { ImportantDateState } from "./ImportantDates/ImportantDateState";
import { SponsorState } from "./Sponsor/SponsorState";
import { StudentState } from "./StudentCertificate/StudentState";
import { ExpositionState } from "./Exposition/ExpositionState";
import { PaymentState } from "./Payment/PaymentState";

export const StateContext = ({ children }) => {
  return (
    <AppState>
      <PaymentState>
        <ExpositionState>
          <StudentState>
            <SponsorState>
              <ImportantDateState>
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
              </ImportantDateState>
            </SponsorState>
          </StudentState>
        </ExpositionState>
      </PaymentState>
    </AppState>
  );
};
