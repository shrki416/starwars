import React from "react";
import { Loader } from "semantic-ui-react";

export default function Loading() {
  return (
    <Loader color="yellow" active inline="centered">
      Loading ...
    </Loader>
  );
}
