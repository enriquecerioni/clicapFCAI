import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { EntitiesContext } from '../../context/EntitiesContext';
import { getDataUserByKey } from '../../helpers/helpers';
import ModalDelete from '../Modals/ModalDelete';
import { CardNew } from './CardNew'
import "./news.css"

export const News = () => {
    const { news, getAllNews, createNewNew, handleChangeNew, allNews } = useContext(EntitiesContext);
    const role = getDataUserByKey('roleId');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [NewToDelete, setNewToDelete] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        createNewNew();
        navigate("/news");
    };

    useEffect(() => {
        getAllNews();
    }, [allNews])

    return (
        <section id="speakers" className="wow fadeInUp">
            <div className="container">
                <div className="section-header">
                    <h2>Novedades</h2>
                    <p>Últimas publicaciones acerca del congreso</p>
                </div>
                {role === 1 && <div className='boxAddNews boxCard'>

                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <input
                                type="text"
                                placeholder="Título"
                                className="form-control"
                                name="title"
                                value={news.title}
                                onChange={handleChangeNew}
                            />
                        </div>
                        <div className='mb-3'>
                            <input
                                type="text"
                                placeholder="Contenido de la novedad"
                                className="form-control"
                                name="content"
                                value={news.content}
                                onChange={handleChangeNew}
                            />
                        </div>
                        <div className='mb-3 text-center'>
                            <button type="submit" className='buttonAddNew'>Crear Novedad</button>
                        </div>
                    </form>
                    {/* <input type="date" className="form-date-input" onChange={handleTime} /> */}
                </div>}
                <div>
                    {showDeleteModal ? (
                        <ModalDelete
                            entity={NewToDelete}
                            showAlert={setShowDeleteModal}
                        />
                    ) : null}
                    {
                        allNews.length > 0 ?
                            allNews.map(news => (
                                <div className='flexNews'>
                                    <CardNew 
                                    news={news}
                                    showAlert={setShowDeleteModal} 
                                    setNewToDelete={setNewToDelete}
                                    key={news.id}
                                    role={role}
                                    />
                                </div>
                            ))
                            :
                            <div className='flexNews'>
                                No existen novedades creadas aún
                            </div>
                    }

                </div>
            </div>
        </section>
    )
}
