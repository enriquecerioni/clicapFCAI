import React, { useEffect, useState, useContext } from "react";
// import "../pays.css";
import { useNavigate } from "react-router";
import { EntitiesContext } from "../../../context/EntitiesContext";
/* import { PaginationCustom } from "../PaginationCustom/PaginationCustom"; */
import { getDataUserByKey } from "../../../helpers/helpers";
import StudentCertificateList from "./StudentCertificateList";

const StudentCertificate = () => {
  const navigate = useNavigate();
  const { myCertificates, getMyCertificates } = useContext(EntitiesContext);

  /* const [filterQuery, setFilterQuery] = useState({ name: "" }); */
  const [page, setPage] = useState(1);
  const idUser = getDataUserByKey("id");
  const filterToAuthor = { authorId: idUser };
  useEffect(() => {
    /*     getmyJobsPaginated(page, filterQuery); */
    getMyCertificates(page, filterToAuthor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <h2 className="text-center">Mis Certificados</h2>
      <div className="box-add-instance">
        <div className="">
          <button
            type="button"
            onClick={() => navigate("/newcertificate")}
            className="btn btn-success"
          >
            <i className="fa-solid fa-plus"></i> Subir un Certificado
          </button>
        </div>
      </div>
      {/* <div className="box-InsanceFilter">
        <InstanceFilter filterQuery={filterQuery} setFilterQuery={setFilterQuery} partners={partners} />
      </div> */}

      {/* TABLA */}
      {myCertificates.length > 0 ? (
        <>
          <div className="box-cardJob">
            {myCertificates.map((certificate, i) => (
              <StudentCertificateList
                certificate={certificate}
                /* setInstanceToDelete={handleDelete} */
                key={i}
              />
            ))}
          </div>
          {/* <PaginationCustom
              currentPage={page}
              totalPages={totalPages}
              paginate={setPage}
            /> */}
        </>
      ) : (
        <p className="text-center">No se han cargado certificados aún.</p>
      )}
    </>
  );
};
export default StudentCertificate;
