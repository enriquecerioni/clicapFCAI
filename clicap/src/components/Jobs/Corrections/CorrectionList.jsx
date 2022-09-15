import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { CorrectionModal } from "./CorrectionModal";
import { getDataUserByKey } from "../../../helpers/helpers";

export const CorrectionList = ({ correction, setuserToDelete }) => {
  const navigate = useNavigate();
  const [showCorrecModal, setCorrecModal] = useState(false);
  const roleId = getDataUserByKey("id");
  /*  const startDate = user.startDate.split('-') */
  return (
    <>
      {/* MODAL FILTER */}
      {showCorrecModal ? (
        <CorrectionModal
          description={correction.details}
          showModal={setCorrecModal}
        />
      ) : null}
      <tr>
        <td>{correction.date}</td>
        <td>{correction.correction.name}</td>
        <td>
          <Button variant="primary" onClick={() => setCorrecModal(true)}>
            Ver
          </Button>
        </td>
        {roleId === 4 ? (
          <td>
            <Button variant="primary" onClick={() => setCorrecModal(true)}>
              Subir Corrección
            </Button>
          </td>
        ) : null}
      </tr>
    </>
  );
};
