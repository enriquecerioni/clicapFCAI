import React from "react";
import { ClicapTooltip } from "../ClicapTooltip/ClicapTooltip";

export const AreaRow = ({ area, showAlert, setAreaToDelete }) => {
  const deleteArea = () => {
    showAlert(true);
    setAreaToDelete({
      id: area.id,
      entityName: area.name,
      entityType: "area",
      navigate: "/configuration",
    });
  };

  return (
    <tr>
      <td>{area.name}</td>
      <td className="text-end">
        <ClicapTooltip tooltip={true} text={"Eliminar área"}>
          <i
            type="button"
            className="fa-solid fa-trash-can icon-size-table btn-delete-table color-icon-error"
            onClick={deleteArea}
          ></i>
        </ClicapTooltip>
      </td>
    </tr>
  );
};
