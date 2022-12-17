import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { CorrectionModal } from "../Corrections/CorrectionModal";
import { EntitiesContext } from "../../../context/EntitiesContext";
import { downloadFile } from "../../../helpers/helpers";

const JobStudentList = ({ job, setjobToDelete }) => {
  const navigate = useNavigate();
  const classInactive = "shadow card-inst border-b-danger";
  const classActive = "shadow card-inst border-b-success";
  const [showCorrecModal, setCorrecModal] = useState(false);
  const { getCorrectionByJob, correction } = useContext(EntitiesContext);

  const getCorrection = () => {
    getCorrectionByJob(job.id);
    setCorrecModal(true);
  };

  return (
    <>
      {showCorrecModal ? (
        <CorrectionModal
          description={correction.details}
          showModal={setCorrecModal}
        />
      ) : null}
      <tr>
        <td>{job.name}</td>
        <td>{job.area.name}</td>
        <td>{job.jobmodality.name}</td>
        <td>{job.jobStatus?.name}</td>
        <td>
          <Button
            variant="info"
            onClick={getCorrection}
            disabled={job.status === null ? true : false}
          >
            Ver Corrección
          </Button>
        </td>
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
            disabled={job.status === null || job.status === 1 ? true : false}
            onClick={() => navigate(`/myjob/${job.id}`)}
          >
            <i className="fa-solid fa-file-arrow-up"></i>
          </Button>
        </td>
        <td>
          <Button
            className="btn btn-info"
            /* disabled={job.status === null ? true : false} */
          >
            <i
              className="icon-size-table fa-solid fa-file-arrow-down"
              type="button"
              onClick={() => downloadFile(job.urlFile,'documents')}
            ></i>
          </Button>
        </td>
      </tr>
    </>
  );
};
export default JobStudentList;
