import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ModalDelete from "../../Modals/ModalDelete";
import { EntitiesContext } from "../../../context/EntitiesContext";
import Select from "react-select";
import { PaginationCustom } from "../../Pagination/Pagination";
import { getDataUserByKey } from "../../../helpers/helpers";
import { StudentCertificateList } from "./StudentCertificateList";
import { StudentContext } from "../../../context/StudentCertificate/StudentContext";

const StudentCertificateAdmin = () => {
  const roleId = getDataUserByKey("roleId");
  const { getAllUsers, usersSelector, setFiltersGlobal, filtersGlobal } =
    useContext(EntitiesContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [CertificateToDelete, setCertificateToDelete] = useState(false);
  const [page, setPage] = useState(1);
  const { getAllRegularCertificates, studentState, totalStudentPages } =
    useContext(StudentContext);
  const { studentCertificates } = studentState;

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
    getAllRegularCertificates(page, filtersGlobal);
  }, [page, filtersGlobal]);

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
                  Autor
                </label>
                <Select
                  options={usersSelector}
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
                    <th>Autor</th>
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
