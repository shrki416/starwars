import React from "react";
import { Table, Container } from "semantic-ui-react";

function CharacterTable({ characters }) {
  const char = characters.map((character) => (
    <Table.Row key={character.name}>
      <Table.Cell>{character.name}</Table.Cell>
      <Table.Cell>{character.birth_year}</Table.Cell>
      <Table.Cell>{character.height}</Table.Cell>
      <Table.Cell>{character.mass}</Table.Cell>
      <Table.Cell>{character.homeworld}</Table.Cell>
      <Table.Cell>{character.species}</Table.Cell>
    </Table.Row>
  ));
  return (
    <Container className="mb characters">
      <Table className="yellow">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Born</Table.HeaderCell>
            <Table.HeaderCell>Height</Table.HeaderCell>
            <Table.HeaderCell>Mass</Table.HeaderCell>
            <Table.HeaderCell>Homeworld</Table.HeaderCell>
            <Table.HeaderCell>Species</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{char}</Table.Body>
      </Table>
    </Container>
  );
}

export default CharacterTable;
