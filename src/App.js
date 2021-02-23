import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Table from "./components/Table";

function App() {
  const [characters, setCharacters] = useState([]);
  const url = `https://swapi.dev/api/people`;

  const getCharacters = async () => {
    const characters = await axios.get(url);

    for (const character of characters.data.results) {
      const homeworldResponse = character.homeworld;
      const homeworld = await axios.get(homeworldResponse);
      character.homeworld = homeworld.data.name;

      const speciesResponse = character.species;
      // console.log(speciesResponse);
      if (!speciesResponse) {
        character.species = "Human";
      } else {
        const species = await axios.get(speciesResponse);
        character.species = species.data.name;
      }

      setCharacters(character);
    }
  };
  // console.log(characters);

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className="App">
      <h1>Starwars</h1>
      <h2>May the force be with you</h2>
      <Table characters={characters} />
    </div>
  );
}

export default App;
