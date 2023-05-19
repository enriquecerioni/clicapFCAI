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

const JobStudent = () => {
  const navigate = useNavigate();

  const { getJobsFiltered, jobState } = useContext(JobContext);
  const { isFetching, jobs, totalJobsPages } = jobState;

  const idUser = getDataUserByKey("id");
  const initialFilters = {
    authorId: idUser,
    name: "",
    areaId: "",
  };
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);

  const handleChangeFilter = (e, name) => {
    if (e) {
      setFilters({
        ...filters,
        [e.target.name]: e.target.value,
      });
    } else {
      setFilters({
        ...filters,
        [name]: "",
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    getJobsFiltered(1, filters);
  };

  useEffect(() => {
    getJobsFiltered(page, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <h2 className="text-center">Mis trabajos</h2>
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
      <div className="mt-3 overflow-x">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Título</th>
              <th>Area</th>
              <th>Modalidad</th>
              <th>Estado</th>
              <th></th>
              <th></th>
              <th></th>
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
    </>
  );
};
export default JobStudent;
