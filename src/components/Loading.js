import { Loader } from "semantic-ui-react";
import React from "react";

export default function Loading() {
  return (
    <Loader color="yellow" active inline="centered">
      Loading ...
    </Loader>
  );
}
