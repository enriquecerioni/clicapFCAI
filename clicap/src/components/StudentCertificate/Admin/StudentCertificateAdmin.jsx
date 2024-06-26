import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ModalDelete from "../../Modals/ModalDelete";
import Select from "react-select";
import { PaginationCustom } from "../../Pagination/Pagination";
import { getDataUserByKey } from "../../../helpers/helpers";
import { StudentCertificateList } from "./StudentCertificateList";
import { StudentContext } from "../../../context/StudentCertificate/StudentContext";
import { UserContext } from "../../../context/User/UserContext";

const StudentCertificateAdmin = () => {
  const roleId = getDataUserByKey("roleId");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [CertificateToDelete, setCertificateToDelete] = useState(false);

  const { getAllUsers, userState } = useContext(UserContext);
  const { authorSelector } = userState

  const { getAllRegularCertificates, studentState } =
    useContext(StudentContext);
  const { studentCertificates, certificateFilters, totalStudentPages } = studentState;

  const [filters, setFilters] = useState(certificateFilters);

  const [page, setPage] = useState(1);
  const handleChangeFilter = (e, name) => {
    if (e) {
      setFilters({
        ...filters,
        [e.target.name]: e.target.value,
      });
    } else {
      setFilters({
        ...filters,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getAllRegularCertificates(1, filters);
  };

  useEffect(() => {
    getAllUsers();
    getAllRegularCertificates(page, filters);
  }, [page, filters]);

  return (
    <>
      <div className="ms-3 me-3">
        <h2 className="text-center">Certificados de Alumno Regular</h2>
        <div className="d-flex justify-content-end"></div>
        {showDeleteModal ? (
          <ModalDelete
            entity={CertificateToDelete}
            showAlert={setShowDeleteModal}
          />
        ) : null}

        {roleId === 1 ? (
          <div className=" mt-2">
            <form
              method="get"
              className="center-filters"
              onSubmit={handleSubmit}
            >
              <div className="me-3">
                <label htmlFor="forAuthorId" className="form-label">
                  DNI - Nombre
                </label>
                <Select
                  options={authorSelector}
                  placeholder={"Seleccione..."}
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

        {studentCertificates.length > 0 ? (
          <>
            <div className="mt-3 overflow-x">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Detalle</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {studentCertificates.map((regularCertificate) => (
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
              totalPages={totalStudentPages}
              paginate={setPage}
            />
          </>
        ) : (
          <p className="mt-4 text-center">
            No hay certificados de alumno regular.
          </p>
        )}
      </div>
    </>
  );
};
export default StudentCertificateAdmin;
