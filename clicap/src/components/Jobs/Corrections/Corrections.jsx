import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NewCorrections } from "./NewCorrections";
import { JobContext } from "../../../context/Job/JobContext";
//components

export const Corrections = () => {
  const { id } = useParams();

  const { getJobId, jobState } = useContext(JobContext);
  const { jobData } = jobState;

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
