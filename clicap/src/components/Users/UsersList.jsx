import React from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

export const UsersList = ({ user, setuserToDelete }) => {
  const navigate = useNavigate();
  /*  const startDate = user.startDate.split('-') */
  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role.name}</td>
        <td className="">
          <i
            type="button"
            className="fa-solid fa-pen-to-square icon-size-table btn-edit-table"
            onClick={() => navigate(`/user/edit/${user.id}`)}
          ></i>
        </td>
        <td>
          <i
            type="button"
            className="fa-solid fa-trash-can icon-size-table btn-delete-table"
            onClick={() =>
              setuserToDelete({
                id: user.id,
                entityName: user.name,
                entityType: "user",
              })
            }
          ></i>
        </td>
      </tr>
    </>
  );
};
