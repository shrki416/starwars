import React from "react";

function Table({ characters, handleClick }) {
  // console.log(characters);
  const char = characters.map((character) => (
    <tr key={character.name}>
      <td>{character.name}</td>
      <td>{character.birth_year}</td>
      <td>{character.height}</td>
      <td>{character.mass}</td>
      <td>{character.homeworld}</td>
      <td>{character.species}</td>
    </tr>
  ));
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Homeworld</th>
            <th>Species</th>
          </tr>
        </thead>
        <tbody>{char}</tbody>
      </table>
    </>
  );
}

export default Table;
