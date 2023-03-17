import React, { useEffect, useState, useContext } from "react";
import "../pays.css";
import { useNavigate } from "react-router";
import { EntitiesContext } from "../../../context/EntitiesContext";
/* import { PaginationCustom } from "../PaginationCustom/PaginationCustom"; */
import { getDataUserByKey } from "../../../helpers/helpers";
import PayStudentList from "./PayStudentList";

const PayStudent = () => {
  const navigate = useNavigate();
  const { myPays, getMyPays } = useContext(EntitiesContext);

  /* const [filterQuery, setFilterQuery] = useState({ name: "" }); */
  const [page, setPage] = useState(1);
  const idUser = getDataUserByKey("id");
  const filterToAuthor = { authorId: idUser };
  useEffect(() => {
    /*     getmyJobsPaginated(page, filterQuery); */
    getMyPays(page, filterToAuthor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <h2 className="text-center">Mis Pagos</h2>

      <div className="box-add-instance ">
        <div className="text-end me-5">
          <button
            type="button"
            onClick={() => navigate("/newpay")}
            className="btn btn-success"
          >
            <i className="fa-solid fa-plus"></i> Subir un Pago
          </button>
        </div>
      </div>

      {/* <div className="box-InsanceFilter">
        <InstanceFilter filterQuery={filterQuery} setFilterQuery={setFilterQuery} partners={partners} />
      </div> */}

      {/* TABLA */}
      {myPays.length > 0 ? (
        <>
          <div className="box-cardPay col d-flex justify-content-center">
            {myPays.map((pay, i) => (
              <PayStudentList
                pay={pay}
                /* setInstanceToDelete={handleDelete} */
                key={pay.id}
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
        <p className="text-center">No se han realizado pagos aún.</p>
      )}
    </>
  );
};
export default PayStudent;
