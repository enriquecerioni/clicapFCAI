import React from 'react'

export const PaginationCustom = ({ currentPage, totalPages, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    console.log(currentPage);
    console.log(totalPages);
    return (
        <nav className='d-flex justify-content-center'>
            <ul className='pagination d-flex flex-wrap justify-content-center'>
                {pageNumbers.map(number => (
                    <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'} >
                        <button onClick={() => paginate(number)} className='page-link'>{number}</button>
                    </li>
                ))}
            </ul>
        </nav >
    )
}
