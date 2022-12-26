import React, { useContext, useEffect, useState } from "react";
import { CertificateContext } from "../../context/Certificate/CertificateContext";
import { CertificateUserList } from "./CertificateUserList";
import { getDataUserByKey } from "../../helpers/helpers";

export default function CertificatesUser() {
  const {
    getAllCertificatesByUser,
    getCertificatesLogo,
    certificateLogo,
    userCertificates,
  } = useContext(CertificateContext);
  const userId = getDataUserByKey("id");

  useEffect(() => {
    getAllCertificatesByUser(userId);
    getCertificatesLogo();
  }, []);
  return (
    <>
      <div className="">
        <h1 className="center-center mt-3">Mis Certificados</h1>
        {userCertificates.length > 0 ? (
          <>
            <div style={{ overflowX: "auto" }}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nombre</th>
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
          <p className="text-center">No hay registros</p>
        )}
      </div>
    </>
  );
}
