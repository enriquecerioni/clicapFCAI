import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { JobsAdminList } from "./JobsAdminList";
import ModalDelete from "../../Modals/ModalDelete";
import { PaginationCustom } from "../../Pagination/Pagination";
import { getDataUserByKey, reqAxiosDownload } from "../../../helpers/helpers";
import { CustomModal } from "../../CustomModal/CustomModal";
import { JobsFilters } from "../JobsFilters/JobsFilters";
import { JobContext } from "../../../context/Job/JobContext";
import { UserContext } from "../../../context/User/UserContext";
import { AreaContext } from "../../../context/Area/AreaContext";
import { AssignEvaluatorModal } from "./AssignEvaluatorModal";

const JobsAdmin = () => {
  const navigate = useNavigate();
  const roleId = getDataUserByKey("roleId");
  const isEvaluator = roleId === 2 ? true : false;

  const { jobState, getJobsFiltered } = useContext(JobContext);
  const { jobsFilter, jobs, totalJobsPages, assignedEvaluator } = jobState;

  const { userState, getAllUsers, getAllEvaluators } = useContext(UserContext);
  const { users, evaluatorsSelector } = userState;

  const { areaState, getAllAreas } = useContext(AreaContext);
  const { areas } = areaState;

  const [filters, setFilters] = useState(jobsFilter);
  const [showAssignEvaluatorModal, setShowAssignEvaluatorModal] =
    useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModalFilters, setShowModalFilters] = useState(false);
  const [JobToDelete, setJobToDelete] = useState({});
  const [page, setPage] = useState(1);

  //evaluator
  const [jobToAssignEvaluator, setJobToAssignEvaluator] = useState("");

  const exportToExcel = async () => {
    await reqAxiosDownload(`/job/export/jobs`, filters, "Trabajos");
  };

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers();
      getAllEvaluators();
    }
    if (areas.length === 0) {
      getAllAreas();
    }
    //search assign jobs when the user is evaluator
    if (isEvaluator) {
      filters.evaluatorId = getDataUserByKey("id");
    }

    getJobsFiltered(page, filters);
  }, [page, assignedEvaluator]);

  return (
    <>
      <div className="ms-3 me-3">
        <h2 className="text-center">Trabajos</h2>
        <div className="d-flex justify-content-end"></div>

        {showModalFilters ? (
          <CustomModal
            title={"Filtros"}
            showModal={showModalFilters}
            setShowModal={setShowModalFilters}
          >
            <JobsFilters
              filters={filters}
              setFilters={setFilters}
              setShowModalFilters={setShowModalFilters}
            />
          </CustomModal>
        ) : null}

        {showDeleteModal ? (
          <ModalDelete entity={JobToDelete} showAlert={setShowDeleteModal} />
        ) : null}

        {showAssignEvaluatorModal ? (
          <AssignEvaluatorModal
            showModal={showAssignEvaluatorModal}
            setShowModal={setShowAssignEvaluatorModal}
            job={jobToAssignEvaluator}
          />
        ) : null}

        {roleId === 1 ? (
          <div className="d-flex justify-content-end me-3">
            <Button
              variant="primary"
              onClick={() => setShowModalFilters(!showModalFilters)}
            >
              <div className="d-flex align-items-center">
                <i className="fa-solid fa-sliders"></i>
                <p className="m-0 ms-2">Filtros</p>
              </div>
            </Button>

            <div className="ms-3">
              <Button variant="btn btn-secondary" onClick={exportToExcel}>
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-file-arrow-down"></i>
                  <p className="ms-2 m-0">Exportar</p>
                </div>
              </Button>
            </div>
          </div>
        ) : null}

        {jobs.length > 0 ? (
          <>
            <div className="mt-3 overflow-x">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Autor</th>
                    <th>Título</th>
                    {isEvaluator ? null : (
                      <>
                        <th>Evaludor 1</th>
                        <th>Evaludor 2</th>
                      </>
                    )}
                    <th>Area</th>
                    <th>Modalidad</th>
                    <th>Estado</th>
                    <th></th>
                    <th></th>
                    {roleId === 1 ? (<>
                      <th></th>
                      <th></th>
                      <th></th>
                    </>) : null}
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((work) => (
                    <JobsAdminList
                      work={work}
                      showAlert={setShowDeleteModal}
                      JobToDelete={JobToDelete}
                      setJobToDelete={setJobToDelete}
                      setShowAssignEvaluatorModal={setShowAssignEvaluatorModal}
                      setJobToAssignEvaluator={setJobToAssignEvaluator}
                      key={work.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
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
    </>
  );
};
export default JobsAdmin;
