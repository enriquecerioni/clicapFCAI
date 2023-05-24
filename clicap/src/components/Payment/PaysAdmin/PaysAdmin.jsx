import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ModalDelete from "../../Modals/ModalDelete";
import { ExtensiveList } from "../../ExtensiveList/ExtensiveList";
import { PaysAdminList } from "./PaysAdminList";
import { PayContext } from "../../../context/Pay/PayContext";
import { UserContext } from "../../../context/User/UserContext";
import Select from "react-select";
import { Loader } from "../../Loader/Loader";
import { reqAxiosDownload } from "../../../helpers/helpers";

const PaysAdmin = () => {
  const initialFilters = {
    authorId: "",
  };

  const { getAllUsers, userState } = useContext(UserContext);
  const { usersSelector, users } = userState;

  const { getPaysFiltered, payState } = useContext(PayContext);
  const { pays, isFetching } = payState;
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [PayToDelete, setPayToDelete] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  const handleChangeFilter = (e, name) => {
    if (e) {
      setFilters({
        ...filters,
        [name]: e.target.value,
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
    getPaysFiltered(1, filters);
  };

  const exportToExcel = async () => {
    await reqAxiosDownload(`/pay/export/pays`, filters, "Pagos");
  };

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers();
    }
    getPaysFiltered(1, filters);
  }, []);

  return (
    <>
      {/*     CAMBIAR */}
      {/* style={{ margin: "0 5rem 0 5rem" }} */}
      <div className="p-2">
        <h2 className="text-center">Pagos</h2>
        <div className="d-flex justify-content-end"></div>

        {showDeleteModal ? (
          <ModalDelete entity={PayToDelete} showAlert={setShowDeleteModal} />
        ) : null}

        <div className="">
          <form method="get" className="center-filter" onSubmit={handleSubmit}>
            <div className="me-3" style={{ width: "350px" }}>
              <label htmlFor="forName" className="form-label">
                Nombre / Dni
              </label>
              <Select
                components={{ ExtensiveList }}
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

            <Button variant="btn btn-secondary" onClick={exportToExcel}>
              Exportar
            </Button>
          </form>
        </div>

        {isFetching ? (
          <div className="center-center">
            <Loader />
          </div>
        ) : null}

        {pays.length > 0 ? (
          <>
            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Autor</th>
                    <th>CUIL / CUIT</th>
                    <th>Condición Frente al IVA</th>
                    <th>Monto</th>
                    <th>Modo de Pago</th>
                    <th>Detalle</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {pays.map((pay) => (
                    <PaysAdminList
                      pay={pay}
                      users={users}
                      showAlert={setShowDeleteModal}
                      setPayToDelete={setPayToDelete}
                      key={pay.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            {/*  <PaginationCustom
              currentPage={page}
              totalPages={totalPages}
              paginate={setPage}
            /> */}
          </>
        ) : (
          <p className="text-center">No hay Pagos</p>
        )}
      </div>
    </>
  );
};
export default PaysAdmin;
