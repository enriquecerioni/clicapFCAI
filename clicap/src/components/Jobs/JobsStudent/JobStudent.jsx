import React, { useEffect, useState } from "react";
import "../jobs.css";
import { useNavigate } from "react-router";
import { EntitiesContext } from "../../../context/EntitiesContext";
//components
import { useContext } from "react";
import { getDataUserByKey } from "../../../helpers/helpers";
import JobStudentList from "./JobStudentList";
import Select from "react-select";
import { Button } from "react-bootstrap";
import { PaginationCustom } from "../../Pagination/Pagination";

const JobStudent = () => {
  const navigate = useNavigate();
  const {
    myJobs,
    allJobs,
    getAllJobs,
    getAllAreas,
    areasSelector,
    totalPages,
  } = useContext(EntitiesContext);
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
    getAllJobs(1, filters);
  };
  useEffect(() => {
    /*     getmyJobsPaginated(page, filterQuery); */
    getAllAreas();
    getAllJobs(page, filters);
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
      <div className="mt-3">
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
            {allJobs.map((job, i) => (
              <JobStudentList job={job} key={job.id} />
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="box-InsanceFilter">
        <InstanceFilter filterQuery={filterQuery} setFilterQuery={setFilterQuery} partners={partners} />
      </div> */}

      {/* TABLA */}
      {allJobs.length > 0 ? (
        <>
          {/*   <div className="box-cardJob">
            {allJobs.map((job, i) => (
              <JobStudentList
                job={job}
             
                key={job.id}
              />
            ))}
          </div> */}
          <PaginationCustom
            currentPage={page}
            totalPages={totalPages}
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
