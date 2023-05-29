import React, { useContext, useEffect, useState } from "react";
import { Loader } from "../../Loader/Loader";
import ModalDelete from "../../Modals/ModalDelete";
import { SponsorContext } from "../../../context/Sponsor/SponsorContex";
import { SponsorList } from "./SponsorList";
import { SponsorModal } from "./SponsorModal";

export const SponsorTable = () => {
  const { getAllSponsors, sponsorState } = useContext(SponsorContext);

  const { isFetching, all, sponsorInitial } = sponsorState;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sponsorToDelete, setSponsorToDelete] = useState(false);
  const [sponsor, setSponsor] = useState(sponsorInitial);
  const [refreshSponsors, setRefreshSponsors] = useState(false);
  const [createOrEditModal, setCreateOrEditModal] = useState(false);

  useEffect(() => {
    getAllSponsors("All");
  }, [refreshSponsors]);

  return (
    <div className="ms-3 me-3">
      <h2 className="text-center">Listado de Sponsors / Avales</h2>

      <div className="text-end">
        <button
          className="btn btn-success"
          onClick={() => {
            setSponsor(sponsorInitial);
            setCreateOrEditModal(!createOrEditModal);
          }}
        >
          Crear Aval / Sponsor
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
        <SponsorModal
          showModal={createOrEditModal}
          setShowModal={setCreateOrEditModal}
          sponsor={sponsor}
          setSponsor={setSponsor}
          refreshSponsors={refreshSponsors}
          setRefreshSponsors={setRefreshSponsors}
        />
      ) : null}

      {showDeleteModal ? (
        <ModalDelete entity={sponsorToDelete} showAlert={setShowDeleteModal} />
      ) : null}

      {all.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Sitio Web</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {all.map((sponsor) => (
                <SponsorList
                  sponsor={sponsor}
                  showAlert={setShowDeleteModal}
                  setSponsorToDelete={setSponsorToDelete}
                  setCreateOrEditModal={setCreateOrEditModal}
                  setSponsor={setSponsor}
                  key={sponsor.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="center-center">
          <p>No hay sponsors / avales creados.</p>
        </div>
      )}
    </div>
  );
};
