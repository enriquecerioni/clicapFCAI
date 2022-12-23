import React from 'react'
import "./news.css"

export const CardNew = ({ news, showAlert, setNewToDelete, role }) => {
    const deleteNew = () => {
        showAlert(true);
        setNewToDelete({
            id: news.id,
            entityName: `la novedad "${news.title}"`,
            entityType: "new",
            image: news.urlFile
        });
    };

    return (
        <div className='boxCard'>
            <h4>{news.title}</h4>
            <hr />
            {/* poner imagen news.urlFile */}
            <img src="" alt="" />
            <p>{news.content}</p>
            <div className='iconPosition'>
            {role === 1 &&
                <i
                    type="button"
                    className="fa-solid fa-trash-can icon-size-table btn-delete-table"
                    onClick={deleteNew}
                    style={{ display: "flexbox", alignItems: "flex-end" }}
                ></i>
            }
            </div>
        </div>
    )
}
