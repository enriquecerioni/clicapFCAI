import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalDelete from "../Modals/ModalDelete";
import { EntitiesContext } from "../../context/EntitiesContext";
import { UsersList } from "./UsersList";

const Users = () => {
  const navigate = useNavigate();
  const { users, getAllUsers } = useContext(EntitiesContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      {/*     CAMBIAR */}
      {/* style={{ margin: "0 5rem 0 5rem" }} */}
      <div style={{ margin: "5rem 5rem 0 5rem" }}>
        <h2 className="text-center">Usuarios</h2>
        <div className="d-flex justify-content-end">
          {/*           <Button
            className="btn btn-success"
            onClick={() => navigate("/customers/create")}
          >
            <i className="fa-solid fa-plus"></i> Subir trabajo
          </Button> */}
        </div>
        {showDeleteModal ? (
          <ModalDelete
            /* entity={customerToDelete} */
            showAlert={setShowDeleteModal}
            /* getCallback={() => getusers(page)} */
          />
        ) : null}
        {users.length > 0 ? (
          <>
            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <UsersList
                      user={user}
                      /*     setCustomerToDelete={handleDelete} */
                      key={user.id}
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
          <p className="text-center">No hay registros</p>
        )}
      </div>
    </>
  );
};
export default Users;
