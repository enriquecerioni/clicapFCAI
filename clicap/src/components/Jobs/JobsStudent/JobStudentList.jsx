import React from "react";
import { useNavigate } from "react-router";
import { Card } from "react-bootstrap";

const JobStudentList = ({ job, setjobToDelete}) => {
  const navigate = useNavigate();
  const classInactive = "shadow card-inst border-b-danger";
  const classActive = "shadow card-inst border-b-success";
  
  return (
    <>
      <Card
        type="button"
        style={{ width: "18rem" }}
        className={job.active === 0 ? classInactive : classActive}
        onClick={() => navigate(`/job/get/${job.id}`)}
      >
        <Card.Body>
          <Card.Title className="text-center mb-2">{job.name}</Card.Title>
          <div className="cardbody-job">
            <div className="">
              <div>{job.area.name}</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default JobStudentList;
