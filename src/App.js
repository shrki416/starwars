import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Table from "./components/Table";
import Pagination from "./components/Pagination";

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const url = `https://swapi.dev/api/people`;

  const getCharacters = async () => {
    const characters = await axios.get(url).then(({ data }) => data.results);

    for (const character of characters) {
      const homeworldURL = character.homeworld;
      const homeworldResponse = await axios.get(homeworldURL);
      character.homeworld = homeworldResponse.data.name;

      const speciesURL = character.species[0];
      if (!speciesURL) {
        character.species = "Human";
      } else {
        const speciesResponse = await axios
          .get(speciesURL)
          .then((res) => res.data);
        character.species = speciesResponse.name;
      }
      const charData = [...characters];
      setCharacters(charData);
    }
  };

  const handleClick = async (e) => {
    console.log(e.target.textContent);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className="App">
      <h1>Starwars</h1>
      <h2>May the force be with you</h2>
      <Table characters={characters} handleClick={handleClick} />
      <Pagination pagination={handleClick} />
    </div>
  );
}

export default App;
