import React, { useState } from "react";
import { Button } from "semantic-ui-react";

function Pagination({ pagination }) {
  const [page, setPage] = useState(1);

  const pages = [];

  for (let i = 1; i < 10; i++) {
    pages.push(i);
  }

  const paginationButtons = pages.map((btn) => (
    <Button
      size="mini"
      key={btn}
      className={`${page === btn ? "yellow" : ""}`}
      onClick={(e) => {
        pagination(e.target.textContent);
        setPage(parseInt(e.target.textContent));
      }}
    >
      {btn}
    </Button>
  ));

  return <div>{paginationButtons}</div>;
}

export default Pagination;
