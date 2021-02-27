import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./App.css";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import { Button } from "@material-ui/core";

function App() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);

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

  const characterSearch = async (e) => {
    e.preventDefault();
    const characters = await axios
      .get(`${url}/?search=${search}`)
      .then(({ data }) => data.results);

    characterData(characters);
    setSearch("");
    setTimeout(() => window.location.reload(), 5000);
  };

  const handleChange = (e) => setSearch(e.target.value);

  useEffect(() => getCharacters(), []);

  return (
    <div className="App">
      <h1>Starwars</h1>
      <form onSubmit={characterSearch}>
        <input type="text" value={search} onChange={handleChange} />
        <button>Search</button>
      </form>
      {loading ? <p>Loading ...</p> : <Table characters={characters} />}
      <Pagination active={active} pagination={pagination} loading={loading} />
    </div>
  );
}

export default App;
