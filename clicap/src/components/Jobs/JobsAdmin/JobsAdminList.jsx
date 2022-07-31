import React from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

export const JobsAdminList = ({ work, users, setworkToDelete }) => {
  const navigate = useNavigate();
  /*  const startDate = work.startDate.split('-') */
  return (
    <>
      <tr>
        <td>{users.find((user) => user.id === work.authorId).name}</td>
        <td>{work.name}</td>
        <td>{work.evaluatorId1}</td>
        <td>{work.evaluatorId2}</td>
        <td>{work.area.name}</td>
        {/* <td>{`${startDate[2]}-${startDate[1]}-${startDate[0]}`}</td> */}
        {/* <td>{work.endDate ? `${work.endDate.split('-')[2]}-${work.endDate.split('-')[1]}-${work.endDate.split('-')[0]}` : '-'}</td> */}
        <td className="">
          <i
            type="button"
            className="fa-solid fa-pen-to-square icon-size-table btn-edit-table"
            onClick={() => navigate(`/works/edit/${work.id}`)}
          ></i>
        </td>
        <td>
          <i
            type="button"
            className="fa-solid fa-trash-can icon-size-table btn-delete-table"
            onClick={() =>
              setworkToDelete({
                id: work.id,
                entityName: work.name,
                entityType: "work",
              })
            }
          ></i>
        </td>
        <td>
          <Button
            className="btn btn-success"
            onClick={() => navigate("/customers/create")}
          >
            Aprobar
          </Button>
        </td>
      </tr>
    </>
  );
};
