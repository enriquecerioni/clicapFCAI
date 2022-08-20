import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { CorrectionModal } from "./CorrectionModal";

export const CorrectionList = ({ correction, setuserToDelete }) => {
  const navigate = useNavigate();
  const [showCorrecModal, setCorrecModal] = useState(false);
  /*  const startDate = user.startDate.split('-') */
  return (
    <>
      {/* MODAL FILTER */}
      {showCorrecModal ? <CorrectionModal showModal={setCorrecModal} /> : null}
      <tr>
        <td>{correction.date}</td>
        <td>{correction.state}</td>
        <td>
          <i type="button" className="fa-solid fa-list-check" onClick={()=>setCorrecModal(true)}></i>
        </td>
      </tr>
    </>
  );
};
