import React from "react";
import "./news.css";

export const CardNew = ({ news, showAlert, setNewToDelete, role }) => {
  const deleteNew = () => {
    showAlert(true);
    setNewToDelete({
      id: news.id,
      entityName: `la novedad "${news.title}"`,
      entityType: "new",
      navigate: "/news",
    });
  };

  return (
    <div className="boxCard">
      <h4>{news.title}</h4>
      <hr />
      <p>{news.content}</p>
      {role === 1 && (
        <i
          type="button"
          className="fa-solid fa-trash-can icon-size-table btn-delete-table"
          onClick={deleteNew}
          style={{ display: "flexbox", alignItems: "flex-end" }}
        ></i>
      )}
    </div>
  );
};
