import React, { useContext, useEffect, useState } from "react";
import { ImportantDateList } from "./ImportantDateList";
import { ImportantDateContext } from "../../../context/ImportantDates/ImportantDateContext";
import { Loader } from "../../Loader/Loader";
import ModalDelete from "../../Modals/ModalDelete";
import { ImportantDateModal } from "./ImportantDateModal";

export const ImportantDateTable = () => {
  const { getAllImportantDates, importantDateState } =
    useContext(ImportantDateContext);

  const { isFetching, importantDates, importantDateInitial } =
    importantDateState;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dateToDelete, setDateToDelete] = useState(false);
  const [date, setDate] = useState(importantDateInitial);
  const [refreshDates, setRefreshDates] = useState(false);
  const [createOrEditModal, setCreateOrEditModal] = useState(false);

  useEffect(() => {
    getAllImportantDates();
  }, [refreshDates]);

  return (
    <div className="ms-3 me-3">
      <h2 className="text-center">Listado de Fechas importantes</h2>

      <div className="text-end">
        <button
          className="btn btn-success"
          onClick={() => {
            setDate(importantDateInitial);
            setCreateOrEditModal(!createOrEditModal);
          }}
        >
          Crear fecha
        </button>
      </div>

      {isFetching ? (
        <div
          style={{
            margin: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <Loader />
        </div>
      ) : null}

      {createOrEditModal ? (
        <ImportantDateModal
          showModal={createOrEditModal}
          setShowModal={setCreateOrEditModal}
          date={date}
          setDate={setDate}
          refreshDates={refreshDates}
          setRefreshDates={setRefreshDates}
        />
      ) : null}

      {showDeleteModal ? (
        <ModalDelete entity={dateToDelete} showAlert={setShowDeleteModal} />
      ) : null}

      {importantDates.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {importantDates.map((date) => (
                <ImportantDateList
                  date={date}
                  showAlert={setShowDeleteModal}
                  setDateToDelete={setDateToDelete}
                  setCreateOrEditModal={setCreateOrEditModal}
                  setDate={setDate}
                  key={date.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="center-center">
          <p>No hay fechas importantes</p>
        </div>
      )}
    </div>
  );
};
