import React from "react";

function Table({ characters }) {
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
            <th>Birth Date</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Homeworld</th>
            <th>Species</th>
          </tr>
        </thead>
        <tbody>{char}</tbody>
      </table>
      <button>PREV</button>
      <button>NEXT</button>
    </>
  );
}

export default Table;
