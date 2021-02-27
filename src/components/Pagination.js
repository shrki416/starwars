import React, { useState } from "react";

function Pagination({ pagination }) {
  const [page, setPage] = useState(1);
  const pages = [];

  for (let i = 1; i < 10; i++) {
    pages.push(i);
  }

  const paginationButtons = pages.map((btn) => (
    <button
      key={btn}
      className={`${page === btn ? "active" : ""}`}
      onClick={(e) => {
        pagination(e.target.textContent);
        setPage(parseInt(e.target.textContent));
      }}
    >
      {btn}
    </button>
  ));

  return <div>{paginationButtons}</div>;
}

export default Pagination;
