import React from "react";
import { Input, Segment } from "semantic-ui-react";

function Form({ search, handleChange }) {
  return (
    <form onSubmit={search}>
      <Segment basic textAlign="center">
        <Input
          action={{ color: "yellow", content: "Search" }}
          iconPosition="left"
          placeholder="Character Search"
          type="text"
          onChange={handleChange}
        />
      </Segment>
    </form>
  );
}

export default Form;
