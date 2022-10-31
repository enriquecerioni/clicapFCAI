import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { CorrectionModal } from "../Corrections/CorrectionModal";
import { EntitiesContext } from "../../../context/EntitiesContext";

const JobStudentList = ({ job, setjobToDelete }) => {
  const navigate = useNavigate();
  const classInactive = "shadow card-inst border-b-danger";
  const classActive = "shadow card-inst border-b-success";
  const [showCorrecModal, setCorrecModal] = useState(false);
  const { getCorrectionByJob, correction } = useContext(EntitiesContext);

  const downloadFile = async (nameFile) => {
    try {
      await axios({
        url: `http://localhost:3000/api/clicap/job/downloadfile?nameFile=${nameFile}`, //your url
        params: "",
        method: "GET",
        responseType: "blob", // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${nameFile}`); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
      return "Descargado";
    } catch (error) {
      console.log(error);
    }
  };

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
            disabled={job.status === null ? true : false}
          >
            <i className="fa-solid fa-file-arrow-up"></i>
          </Button>
        </td>
        <td>
          <Button
            className="btn btn-info"
            disabled={job.status === null ? true : false}
          >
            <i
              className="icon-size-table fa-solid fa-file-arrow-down"
              type="button"
              onClick={() => downloadFile(job.urlFile)}
            ></i>
          </Button>
        </td>
      </tr>
    </>
  );
};
export default JobStudentList;
