import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { JobsAdminList } from "./JobsAdminList";
import ModalDelete from "../../Modals/ModalDelete";
import { EntitiesContext } from "../../../context/EntitiesContext";
import { PaginationCustom } from "../../Pagination/Pagination";
import { getDataUserByKey, reqAxiosDownload } from "../../../helpers/helpers";
import { CustomModal } from "../../CustomModal/CustomModal";
import { JobsFilters } from "../JobsFilters/JobsFilters";
import { JobContext } from "../../../context/Job/JobContext";
import { UserContext } from "../../../context/User/UserContext";
import { AreaContext } from "../../../context/Area/AreaContext";

const JobsAdmin = () => {
  const navigate = useNavigate();
  const roleId = getDataUserByKey("roleId");

  const { allJobs, getAllJobs, totalPages } = useContext(EntitiesContext);

  const { jobState } = useContext(JobContext);
  const { jobsFilter } = jobState;

  const { userState, getAllUsers, getAllEvaluators } = useContext(UserContext);
  const { users } = userState;

  const { areaState, getAllAreas } = useContext(AreaContext);
  const { areas } = areaState;

  const [filters, setFilters] = useState(jobsFilter);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModalFilters, setShowModalFilters] = useState(false);
  const [JobToDelete, setJobToDelete] = useState(false);
  const [page, setPage] = useState(1);

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
    getAllJobs(page, filters);
  }, [page]);

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
              <Button variant="outline-secondary" onClick={exportToExcel}>
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-file-arrow-down"></i>
                  <p className="ms-2 m-0">Exportar</p>
                </div>
              </Button>
            </div>
          </div>
        ) : null}

        {allJobs.length > 0 ? (
          <>
            <div className="mt-3 overflow-x">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Autor</th>
                    <th>Título</th>
                    <th>Evaludor 1</th>
                    <th>Evaludor 2</th>
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
                  {allJobs.map((work) => (
                    <JobsAdminList
                      work={work}
                      showAlert={setShowDeleteModal}
                      setJobToDelete={setJobToDelete}
                      key={work.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <PaginationCustom
              currentPage={page}
              totalPages={totalPages}
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
