import React, { useContext } from "react";
import { CustomModal } from "../../CustomModal/CustomModal";
import { FloatingLabel, Form } from "react-bootstrap";
import { ClicapTooltip } from "../../ClicapTooltip/ClicapTooltip";
import { SponsorContext } from "../../../context/Sponsor/SponsorContex";

export const SponsorModal = ({
  showModal,
  setShowModal,
  sponsor,
  setSponsor,
  refreshSponsors,
  setRefreshSponsors,
}) => {
  const getNewOrEdit = () => (sponsor.isNew ? "Nuevo" : "Editar");
  const disabled = () =>
    sponsor.name === "" ||
    sponsor.type === "" ||
    sponsor.link === "" ||
    sponsor.urlFile === ""
      ? true
      : false;

  const { createNewSponsor, sponsorState } = useContext(SponsorContext);

  const handleChangeSponsor = (e) => {
    let value =
      e.target.type === "file"
        ? e.target.value === ""
          ? ""
          : e.target.files[0]
        : e.target.value;

    setSponsor({
      ...sponsor,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async () => {
    await createNewSponsor(sponsor);
    setRefreshSponsors(!refreshSponsors);
    setShowModal(!showModal);
  };

  return (
    <CustomModal
      sizeClass="modal-50w"
      showModal={showModal}
      setShowModal={setShowModal}
      title={`${getNewOrEdit()} sponsor / aval`}
    >
      <div className="">
        <label htmlFor="forName" className="form-label label-filters">
          Nombre
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Nombre de la Institucion o Entidad..."
          onChange={handleChangeSponsor}
        />
        <label htmlFor="forName" className="form-label label-filters">
          Tipo
        </label>
        <select
          class="form-select"
          aria-label="Default select example"
          name="type"
          onChange={handleChangeSponsor}
        >
          <option selected>Selecciona un tipo (Aval - Sponsor)</option>
          <option value="Aval">Aval</option>
          <option value="Sponsor">Sponsor</option>
        </select>
        <label htmlFor="forName" className="form-label label-filters">
          Sitio Web
        </label>
        <input
          type="text"
          name="link"
          className="form-control"
          placeholder="Sitio web completo, ej: http://www.google.com/"
          onChange={handleChangeSponsor}
        />
        <label htmlFor="forName" className="form-label label-filters">
          Logo
        </label>
        <input
          type="file"
          className="form-control"
          name="urlFile"
          onChange={handleChangeSponsor}
        />
      </div>
      <div className="center-center">
        <ClicapTooltip
          tooltip={disabled()}
          text={"Por favor completar todos los campos"}
        >
          <div className="d-flex">
            <button
              className="mt-2 btn btn-primary"
              disabled={disabled()}
              onClick={handleSubmit}
            >
              {`${getNewOrEdit()} sponsor / aval`}
            </button>
          </div>
        </ClicapTooltip>
      </div>
    </CustomModal>
  );
};
