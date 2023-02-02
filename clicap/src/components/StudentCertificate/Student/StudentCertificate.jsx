import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { CertificateContext } from "../../../context/Certificate/CertificateContext";
import { EntitiesContext } from "../../../context/EntitiesContext";
import { getDataUserByKey } from "../../../helpers/helpers";
import { Loader } from "../../Loader/Loader";
import StudentCertificateList from "./StudentCertificateList";

const StudentCertificate = () => {
  const navigate = useNavigate();
  const { myCertificates, getMyCertificates } = useContext(EntitiesContext);
  const { isFetching } = useContext(CertificateContext);
  const [page, setPage] = useState(1);
  const idUser = getDataUserByKey("id");
  const filterToAuthor = { authorId: idUser };

  useEffect(() => {
    getMyCertificates(page, filterToAuthor);
  }, [page]);

  return (
    <>
      <h2 className="text-center">Mis Certificados</h2>
      <div className="box-add-instance ">
        <div className="text-end me-5">
          <button
            type="button"
            onClick={() => navigate("/newcertificate")}
            className="btn btn-success"
          >
            <i className="fa-solid fa-plus"></i> Subir un Certificado
          </button>
        </div>
      </div>

      {!isFetching ? (
        <div className="center-center">
          <Loader />
        </div>
      ) : null}

      {myCertificates.length > 0 ? (
        <>
          <div className="box-cardJob">
            {myCertificates.map((certificate, i) => (
              <StudentCertificateList certificate={certificate} key={i} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">No se han cargado certificados aún.</p>
      )}
    </>
  );
};
export default StudentCertificate;
