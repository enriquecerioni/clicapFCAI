import React, { useContext, useEffect, useState } from "react";
import { CertificateContext } from "../../context/Certificate/CertificateContext";
import { CertificateUserList } from "./CertificateUserList";
import { getDataUserByKey } from "../../helpers/helpers";
import { Loader } from "../Loader/Loader";

export default function CertificatesUser() {
  const {
    getAllCertificatesByUser,
    getCertificatesLogo,
    certificateLogo,
    userCertificates,
  } = useContext(CertificateContext);
  const { isFetching } = useContext(CertificateContext);
  const userId = getDataUserByKey("id");

  useEffect(() => {
    getAllCertificatesByUser(userId);
    getCertificatesLogo();
  }, []);
  return (
    <>
      <div className="">
        <h1 className="center-center mt-3">Mis Certificados</h1>

        {isFetching ? (
          <div className="center-center">
            <Loader />
          </div>
        ) : null}

        {userCertificates.length > 0 ? (
          <>
            <div style={{ overflowX: "auto" }}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nombre del certificado</th>
                    <th>Nombre del trabajo</th>
                    <th>Descargar</th>
                  </tr>
                </thead>
                <tbody>
                  {userCertificates.map((userCertificate) => (
                    <CertificateUserList
                      userCertificate={userCertificate}
                      certificateLogo={certificateLogo}
                      key={userCertificate.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-center">No tienes certificados asignados aún...</p>
        )}
      </div>
    </>
  );
}
