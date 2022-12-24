import React from 'react'

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
      <td><i
        type="button"
        className="fa-solid fa-trash-can icon-size-table btn-delete-table"
        onClick={deleteArea}
      ></i></td>
    </tr>
  )
}
