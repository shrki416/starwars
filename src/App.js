import { useEffect, useState } from "react";
import CharacterTable from "./components/CharacterTable";
import Loading from "./components/Loading";
import Form from "./components/Form";
import Pagination from "./components/Pagination";
import { Header } from "semantic-ui-react";
import "./App.css";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const url = `https://swapi.dev/api/people`;
  const fixURL = (url) => url.replace("http", "https");

  const getCharacters = async () => {
    setLoading(true);
    const characters = await axios
      .get(`${url}/`)
      .then(({ data }) => data.results);
    await characterData(characters);
    setLoading(false);
  };

  const characterData = async (characters) => {
    setLoading(true);
    for (const character of characters) {
      await getHomeWorld(character);
      await getSpecies(character);
      setCharacters([...characters]);
    }
    setLoading(false);
  };

  const getHomeWorld = async (character) => {
    const homeworldURL = fixURL(character.homeworld);
    const homeworldResponse = await axios
      .get(homeworldURL)
      .then((res) => res.data);
    character.homeworld = homeworldResponse.name;
  };

  const getSpecies = async (character) => {
    const speciesURL = fixURL(character.species.toString());
    if (!speciesURL) {
      character.species = "Human";
    } else {
      const speciesResponse = await axios.get(speciesURL);
      character.species = speciesResponse.data.name;
    }
  };

  const pagination = async (number) => {
    const characters = await axios.get(`${url}/?page=${number}`);
    characterData(characters.data.results);
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
      <Header as="h1">Starwars</Header>
      <Form search={characterSearch} handleChange={handleChange} />
      {loading ? <Loading /> : <CharacterTable characters={characters} />}
      <Pagination pagination={pagination} loading={loading} />
    </div>
  );
}

export default App;
