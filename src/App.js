import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./App.css";
import Table from "./components/Table";
import Pagination from "./components/Pagination";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = `https://swapi.dev/api/people`;

  const getCharacters = async () => {
    setLoading(true);
    const characters = await axios.get(url).then(({ data }) => data.results);
    await characterData(characters);
    setLoading(false);
  };

  const characterData = async (characters) => {
    setLoading(true);
    for (const character of characters) {
      await getHomeWorld(character);
      await getSpecies(character);
      const charData = [...characters];
      setCharacters(charData);
    }
    setLoading(false);
  };

  const fixURL = (url) => url.replace("http", "https");

  const getHomeWorld = async (character) => {
    const homeworldURL = fixURL(character.homeworld);
    const homeworldResponse = await axios.get(homeworldURL);
    character.homeworld = homeworldResponse.data.name;
  };

  const getSpecies = async (character) => {
    const speciesURL = fixURL(character.species.toString());
    if (!speciesURL) {
      character.species = "Human";
    } else {
      const speciesResponse = await axios
        .get(speciesURL)
        .then((res) => res.data);
      character.species = speciesResponse.name;
    }
  };

  const pagination = async (number) => {
    const characters = await axios
      .get(`${url}/?page=${number}`)
      .then(({ data }) => data.results);

    characterData(characters);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className="App">
      <h1>Starwars</h1>
      <h2>May the force be with you</h2>
      {loading ? <p>Loading ...</p> : <Table characters={characters} />}
      <Pagination pagination={pagination} loading={loading} />
    </div>
  );
}

export default App;
