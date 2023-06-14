import React, { useContext, useEffect, useState } from "react";
import { CorrectionList } from "./CorrectionList";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { EntitiesContext } from "../../../context/EntitiesContext";
import axios from "axios";
import { NewCorrections } from "./NewCorrections";
import { downloadFile, getDataUserByKey } from "../../../helpers/helpers";
import { JobContext } from "../../../context/Job/JobContext";
//components

export const Corrections = () => {
  const { id } = useParams();

  const { getJobId, jobState } = useContext(JobContext);
  const { jobData } = jobState;

  const [newCorrection, setNewCorrection] = useState(false);

  const getJobToNewCorrection = async () => await getJobId(id);

  useEffect(() => {
    getJobToNewCorrection();
  }, []);
  return (
    <>
      <h2 className="text-center">
        Correcciones del {jobData ? jobData.name : null}
      </h2>
      <NewCorrections />
    </>
  );
};
