import React from "react";
import { useNavigate } from "react-router";
import { Button, Card } from "react-bootstrap";

const JobStudentList = ({ job, setjobToDelete }) => {
  const navigate = useNavigate();
  const classInactive = "shadow card-inst border-b-danger";
  const classActive = "shadow card-inst border-b-success";

  return (
    <>
      <tr>
        <td>{job.name}</td>
        <td>{job.area.name}</td>
        <td>{job.jobmodality.name}</td>
        <td>{job.jobStatus?.name}</td>
        <td>
          <i
            type="button"
            className="fa-solid fa-trash-can icon-size-table btn-delete-table"
            onClick={""}
          ></i>
        </td>
        <td>
          <Button
            className="btn btn-success"
            disabled={job.status === null ? true : false}
          >
            <i className="fa-solid fa-file-arrow-up"></i>
          </Button>
        </td>
        <td>
          <i className="icon-size-table fa-solid fa-file-arrow-down"></i>
        </td>
      </tr>
    </>
  );
};
export default JobStudentList;
