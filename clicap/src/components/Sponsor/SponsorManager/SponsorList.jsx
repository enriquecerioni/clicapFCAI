import React from "react";
import { useLocation, useNavigate } from "react-router";
import { ClicapTooltip } from "../../ClicapTooltip/ClicapTooltip";

export const SponsorList = ({ sponsor, setSponsorToDelete, showAlert }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const deleteSponsor = () => {
    showAlert(true);
    setSponsorToDelete({
      id: sponsor.id,
      entityName: sponsor.title,
      entityType: "sponsor",
      navigate: pathname,
    });
  };

  return (
    <>
      <tr>
        <td>{sponsor.name}</td>
        <td>{sponsor.type}</td>
        <td>{sponsor.link}</td>
        <td>
          <ClicapTooltip tooltip={true} text={"Eliminar sponsor/aval"}>
            <i
              type="button"
              className="fa-solid fa-trash-can color-icon-error icon-size-table btn-delete-table"
              onClick={deleteSponsor}
            ></i>
          </ClicapTooltip>
        </td>
      </tr>
    </>
  );
};
