import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { getDataUserByKey } from "../../../helpers/helpers";
import StudentCertificateList from "./StudentCertificateList";
import { StudentContext } from "../../../context/StudentCertificate/StudentContext";

const StudentCertificate = () => {
  const navigate = useNavigate();
  const { studentState, getAllRegularCertificates } = useContext(StudentContext);
  const { studentCertificates, refreshCertificates } = studentState;

  const [page, setPage] = useState(1);
  const idUser = getDataUserByKey("id");
  const filterToAuthor = { authorId: idUser };

  useEffect(() => {
    getAllRegularCertificates(page, filterToAuthor);
  }, [page, refreshCertificates]);

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

      {studentCertificates.length > 0 ? (
        <>
          <div className="student-certificate-container">
            {studentCertificates.map((certificate, i) => (
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
