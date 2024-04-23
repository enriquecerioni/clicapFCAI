import React, { useContext, useEffect, useState } from "react";
import ModalDelete from "../Modals/ModalDelete";
import Select from "react-select";
import { PaginationCustom } from "../Pagination/Pagination";
import { UserContext } from "../../context/User/UserContext";
import { ExtensiveList } from "../ExtensiveList/ExtensiveList";
import { CertificatesAwardedList } from "./CertificatesAwardedList";
import { CertificateContext } from "../../context/Certificate/CertificateContext";

const CertificatesAwarded = () => {
  const { getAllUsers, userState } = useContext(UserContext);
  const { usersSelector, users, usersFiltered, totalUsersPages } = userState;

  const {
    getAllCertificatesPaginated,
    getCertificatesLogo,
    ceritificateState,
  } = useContext(CertificateContext);
  const {
    userCertificates,
    totalCertificatesPages,
    certificateLogo,
    certificateTypesOpt,
  } = ceritificateState;

  const initialFilters = {
    identifyNumber: "",
    type: "",
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [certificateAwardedToDelete, setCertificatesAwardedToDelete] =
    useState(false);
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
    getAllCertificatesPaginated(1, filters);
  };

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers();
    }

    if (certificateLogo === "") {
      getCertificatesLogo();
    }

    getAllCertificatesPaginated(page, filters);
  }, [page]);

  return (
    <>
      {showDeleteModal ? (
        <ModalDelete
          entity={certificateAwardedToDelete}
          showAlert={setShowDeleteModal}
        />
      ) : null}

      <div className="ms-3 me-3">
        <h2 className="text-center">Listado de Usuarios</h2>

        <div className="">
          <form method="get" className="center-filter" onSubmit={handleSubmit}>
            <div className="me-3" style={{ width: "350px" }}>
              <label htmlFor="forName" className="form-label">
                DNI - Nombre
              </label>
              <Select
                components={{ ExtensiveList }}
                options={usersSelector}
                placeholder={"Seleccione..."}
                name="identifyNumber"
                isClearable={true}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#3D84A8",
                  },
                })}
                onChange={(e) => handleChangeFilter(e, "identifyNumber")}
              />
            </div>
            <div style={{ width: "200px" }} className="me-3">
              <label htmlFor="forAuthorId" className="form-label">
                Tipo de certificado
              </label>
              <Select
                options={certificateTypesOpt}
                placeholder={"Seleccione..."}
                name="type"
                isClearable={true}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#3D84A8",
                  },
                })}
                onChange={(e) => handleChangeFilter(e, "type")}
              />
            </div>

            <button className="btn btn-primary" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        {userCertificates.length > 0 ? (
          <>
            <div style={{ overflowX: "auto" }}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Tipo de Certificado</th>
                    <th>Nombre del Certificado</th>
                    <th>Nombre del Trabajo (opcional)</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {userCertificates.map((certificate) => (
                    <CertificatesAwardedList
                      certificate={certificate}
                      showAlert={setShowDeleteModal}
                      setCertificatesAwardedToDelete={
                        setCertificatesAwardedToDelete
                      }
                      /*     setCustomerToDelete={handleDelete} */
                      key={certificate.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <PaginationCustom
              currentPage={page}
              totalPages={totalCertificatesPages}
              paginate={setPage}
            />
          </>
        ) : (
          <p className="text-center">No hay registros</p>
        )}
      </div>
    </>
  );
};
export default CertificatesAwarded;
