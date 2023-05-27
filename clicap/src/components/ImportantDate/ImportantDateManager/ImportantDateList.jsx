import React from "react";
import { useLocation, useNavigate } from "react-router";
import { ClicapTooltip } from "../../ClicapTooltip/ClicapTooltip";

export const ImportantDateList = ({
  date,
  setDateToDelete,
  showAlert,
  setCreateOrEditModal,
  setDate,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const deleteUser = () => {
    showAlert(true);
    setDateToDelete({
      id: date.id,
      entityName: date.title,
      entityType: "importantdate",
      navigate: pathname,
    });
  };

/*   const editDate = () => {
    date.isNew = false;
    setDate(date);
    setCreateOrEditModal(true);
  }; */

  return (
    <>
      <tr>
        <td>{date.title}</td>
        <td>{date.description}</td>
    {/*     <td className="">
          <ClicapTooltip tooltip={true} text={"Editar fecha importante"}>
            <i
              type="button"
              className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
              onClick={editDate}
            ></i>
          </ClicapTooltip>
        </td> */}

        <td>
          <ClicapTooltip tooltip={true} text={"Eliminar fecha importante"}>
            <i
              type="button"
              className="fa-solid fa-trash-can color-icon-error icon-size-table btn-delete-table"
              onClick={deleteUser}
            ></i>
          </ClicapTooltip>
        </td>
      </tr>
    </>
  );
};
