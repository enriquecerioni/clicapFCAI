import React, { useEffect, useState } from "react";
import "../jobs.css";
import { useNavigate } from "react-router";
//components
import { useContext } from "react";
import { getDataUserByKey } from "../../../helpers/helpers";
import JobStudentList from "./JobStudentList";
import { PaginationCustom } from "../../Pagination/Pagination";
import { Loader } from "../../Loader/Loader";
import { JobContext } from "../../../context/Job/JobContext";
import { AppContext } from "../../../context/App/AppContext";

const JobStudent = () => {
  const navigate = useNavigate();
  const idUser = getDataUserByKey("id");

  const initialFilters = {
    userId: idUser,
    name: "",
    areaId: "",
  };

  const { getJobsFiltered, jobState, cleanJobData } = useContext(JobContext);
  const { isFetching, jobs, totalJobsPages, jobData } = jobState;
  const { appState, getEventDate } = useContext(AppContext);
  const { eventDate, deadlineDays } = appState;
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);

  const evaluateDate = (date, deadlineDays = 30) => {
    const today = new Date();
    const eventDate = new Date(date);

    // Calcula la diferencia en milisegundos
    const differenceInMs = eventDate - today;
    
    // Convierte la diferencia a días
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
    
    // Verifica si la diferencia es mayor o igual a 30 días
    return differenceInDays >= deadlineDays;
  }

  useEffect(() => {
    getJobsFiltered(page, filters);
    getEventDate()
    if (jobData.name !== "") {
      cleanJobData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="ms-3 me-3">
      <h2 className="text-center">Mis trabajos</h2>
      {
        evaluateDate(eventDate, deadlineDays) && (
          <div className="box-add-instance ">
            <div className="text-end me-5">
              <button
                type="button"
                onClick={() => navigate("/newjob")}
                className="btn btn-success"
              >
                <i className="fa-solid fa-plus"></i> Nuevo trabajo
              </button>
            </div>
          </div>
        )
      }
      <div className="mt-3 overflow-x">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Título</th>
              <th>Area</th>
              <th>Modalidad</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {jobs &&
              jobs.map((job, i) => <JobStudentList job={job} key={job.id} />)}
          </tbody>
        </table>
      </div>

      {isFetching ? (
        <div className="center-center">
          <Loader />
        </div>
      ) : null}

      {jobs.length > 0 ? (
        <>
          <PaginationCustom
            currentPage={page}
            totalPages={totalJobsPages}
            paginate={setPage}
          />
        </>
      ) : (
        <p className="mt-4 text-center">No hay Trabajos</p>
      )}
    </div>
  );
};
export default JobStudent;
