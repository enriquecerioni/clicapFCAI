import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ModalDelete from "../../Modals/ModalDelete";
import { EntitiesContext } from "../../../context/EntitiesContext";
import Select from "react-select";
import { PaginationCustom } from "../../Pagination/Pagination";
import { getDataUserByKey, reqAxiosDownload } from "../../../helpers/helpers";
import { StudentCertificateList } from "./StudentCertificateList";

const StudentCertificateAdmin = () => {
  const navigate = useNavigate();
  const roleId = getDataUserByKey("roleId");
  const userId = getDataUserByKey("id");
  const {
    allJobs,
    getAllJobs,
    users,
    getAllUsers,
    getAllAreas,
    usersSelector,
    areasSelector,
    totalPages,
    allStatusJob,
    getAllEvaluators,
    allEvaluatorsSelector,
    setFiltersGlobal,
    filtersGlobal,
    allRegularCertificates,
    getAllRegularCertificates
  } = useContext(EntitiesContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [CertificateToDelete, setCertificateToDelete] = useState(false);
  const [page, setPage] = useState(1);

  const handleChangeFilter = (e, name) => {
    if (e) {
      setFiltersGlobal({
        ...filtersGlobal,
        [e.target.name]: e.target.value,
      });
    } else {
      setFiltersGlobal({
        ...filtersGlobal,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getAllRegularCertificates(1, filtersGlobal);
  };

  useEffect(() => {
    getAllUsers();
    getAllRegularCertificates(page, filtersGlobal)
  }, [page]);

  return (
    <>
      <div className="ms-3 me-3">
        <h2 className="text-center">Certificados de Alumno Regular</h2>
        <div className="d-flex justify-content-end">
        </div>
        {showDeleteModal ? (
          <ModalDelete entity={CertificateToDelete} showAlert={setShowDeleteModal} />
        ) : null}

        {roleId === 1 ? (
          <div className=" mt-2">
            <form
              method="get"
              className="center-filters"
              onSubmit={handleSubmit}
            >
              <div  className="me-3">
                <label htmlFor="forAuthorId" className="form-label">
                  Autor
                </label>
                <Select
                  options={usersSelector}
                  placeholder={"seleccione.."}
                  name="authorId"
                  isClearable={true}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: "#3D84A8",
                    },
                  })}
                  onChange={(e) => handleChangeFilter(e, "authorId")}
                />
              </div>
              
              <Button variant="primary" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </Button>
            </form>
          </div>
        ) : null}

        {allRegularCertificates.length > 0 ? (
          <>
            <div className="mt-3 overflow-x">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Autor</th>
                    <th>Detalle</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allRegularCertificates.map((regularCertificate) => (
                    <StudentCertificateList
                      regularCertificate={regularCertificate}
                      showAlert={setShowDeleteModal}
                      setCertificateToDelete={setCertificateToDelete}
                      key={regularCertificate.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <PaginationCustom
              currentPage={page}
              totalPages={totalPages}
              paginate={setPage}
            />
          </>
        ) : (
          <p className="mt-4 text-center">No hay certificados de alumno regular.</p>
        )}
      </div>
    </>
  );
};
export default StudentCertificateAdmin;
