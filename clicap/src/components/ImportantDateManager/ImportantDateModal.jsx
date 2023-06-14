import React, { useContext } from "react";
import { CustomModal } from "../CustomModal/CustomModal";
import { FloatingLabel, Form } from "react-bootstrap";
import { ClicapTooltip } from "../ClicapTooltip/ClicapTooltip";
import { ImportantDateContext } from "../../context/ImportantDates/ImportantDateContext";

export const ImportantDateModal = ({
  showModal,
  setShowModal,
  date,
  setDate,
  refreshDates,
  setRefreshDates,
}) => {
  const getNewOrEdit = () => (date.isNew ? "Nueva" : "Editar");
  const disabled = () =>
    date.title === "" || date.description === "" ? true : false;

  const { createNewImportantDate, importantDateState } =
    useContext(ImportantDateContext);

  const handleChangeImpDate = (e) => {
    setDate({
      ...date,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await createNewImportantDate(date);
    setRefreshDates(!refreshDates);
    setShowModal(!showModal);
  };

  return (
    <CustomModal
    sizeClass="modal-50w"
      showModal={showModal}
      setShowModal={setShowModal}
      title={`${getNewOrEdit()} fecha importante`}
    >
      <div className="">
        <label htmlFor="forName" className="form-label label-filters">
          Título
        </label>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="Título"
          onChange={handleChangeImpDate}
        />
        <FloatingLabel controlId="floatingTextarea2" label="Descripción">
          <Form.Control
            className="mt-3"
            name="description"
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
            onChange={handleChangeImpDate}
          />
        </FloatingLabel>
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
              {`${getNewOrEdit()} fecha`}
            </button>
          </div>
        </ClicapTooltip>
      </div>
    </CustomModal>
  );
};
