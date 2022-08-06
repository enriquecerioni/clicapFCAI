import React, { useEffect, useState } from "react";
import "../jobs.css";
import { useNavigate } from "react-router";
import { EntitiesContext } from "../../../context/EntitiesContext";
//components
import { useContext } from "react";
/* import { PaginationCustom } from "../PaginationCustom/PaginationCustom"; */
import { getDataUserByKey } from "../../../helpers/helpers";
import JobStudentList from "./JobStudentList";

const JobStudent = () => {
  const navigate = useNavigate();
  const { myJobs, getMyJobs } = useContext(EntitiesContext);

  /* const [filterQuery, setFilterQuery] = useState({ name: "" }); */
  const [page, setPage] = useState(1);
  const idUser = getDataUserByKey("id");
  const filterToAuthor = { authorId: idUser };
  useEffect(() => {
    /*     getmyJobsPaginated(page, filterQuery); */
    getMyJobs(page, filterToAuthor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <h2 className="text-center">Mis trabajos</h2>
      <div className="box-add-instance">
        <div className="">
          <button
            type="button"
            onClick={() => navigate("/newjob")}
            className="btn btn-success"
          >
            <i className="fa-solid fa-plus"></i> Nuevo trabajo
          </button>
        </div>
      </div>
      {/* <div className="box-InsanceFilter">
        <InstanceFilter filterQuery={filterQuery} setFilterQuery={setFilterQuery} partners={partners} />
      </div> */}

      {/* TABLA */}
      {myJobs.length > 0 ? (
        <>
          <div className="box-cardJob">
            {myJobs.map((job, i) => (
              <JobStudentList
                job={job}
                /* setInstanceToDelete={handleDelete} */
                key={job.id}
              />
            ))}
          </div>
          {/* <PaginationCustom
              currentPage={page}
              totalPages={totalPages}
              paginate={setPage}
            /> */}
        </>
      ) : (
        <p className="text-center">No hay Trabajos</p>
      )}
    </>
  );
};
export default JobStudent;
