import React from "react";
import "./news.css";

export const CardNew = ({ news, showAlert, setNewToDelete, role }) => {
    const deleteNew = () => {
        showAlert(true);
        setNewToDelete({
            id: news.id,
            entityName: `la novedad "${news.title}"`,
            entityType: "new",
            navigate: "/news",
            image: news.urlFile
        });
    };

    return (
        <div className='boxCard'>
            <div className='boxImg'>
                <img className='imgNews ' src={`data:image/png;base64,${news.imgbase64}`} alt="" />
            </div>
            <h4>{news.title}</h4>
            <hr />
            <a href={news.content} style={{textDecoration:"none"}} target="blank">Click aquí</a> para mas información.
            
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
