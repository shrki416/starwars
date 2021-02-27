import React, { useState } from "react";

function Pagination({ active, pagination }) {
  const pages = [];

  for (let i = 1; i < 10; i++) {
    pages.push(i);
  }

  const paginationButtons = pages.map((btn) => (
    <button
      key={btn}
      className={active ? "active" : ""}
      onClick={(e) => pagination(e.target.textContent)}
    >
      {btn}
    </button>
  ));

  return <div>{paginationButtons}</div>;
}

export default Pagination;
