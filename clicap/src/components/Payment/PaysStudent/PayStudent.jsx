import React, { useEffect, useState, useContext } from "react";
import "../pays.css";
import { useNavigate } from "react-router";
/* import { PaginationCustom } from "../PaginationCustom/PaginationCustom"; */
import { getDataUserByKey } from "../../../helpers/helpers";
import PayStudentList from "./PayStudentList";
import { PayContext } from "../../../context/Pay/PayContext";

const PayStudent = () => {
  const navigate = useNavigate();
  const { payState, getAllPays } = useContext(PayContext);
  const { pays, refreshPays } = payState;

  const [page, setPage] = useState(1);
  const idUser = getDataUserByKey("id");
  const filterToAuthor = { authorId: idUser };

  useEffect(() => {
    /*     getmyJobsPaginated(page, filterQuery); */
    getAllPays(page, filterToAuthor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, refreshPays]);

  return (
    <>
      <h2 className="text-center">Mis Pagos</h2>
      <div className="box-add-instance">
        <div className="text-end me-3 mb-3">
          <button
            type="button"
            onClick={() => navigate("/newpay")}
            className="btn btn-success"
          >
            <i className="fa-solid fa-plus"></i> Subir un Pago
          </button>
        </div>
      </div>

      {/* TABLA */}
      {pays?.length > 0 ? (
        <div className="pay-container">
          {pays.map((pay, i) => (
            <PayStudentList
              pay={pay}
              /* setInstanceToDelete={handleDelete} */
              key={pay.id}
            />
          ))}
          {/* <PaginationCustom
              currentPage={page}
              totalPages={totalPages}
              paginate={setPage}
            /> */}
        </div>
      ) : (
        <p className="text-center">No se han realizado pagos aún.</p>
      )}
    </>
  );
};
export default PayStudent;
