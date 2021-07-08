import { useEffect, useRef, useState } from "react";
import CharacterTable from "./components/CharacterTable";
import Loading from "./components/Loading";
import Form from "./components/Form";
import Pagination from "./components/Pagination";
import Toggle from "./components/Toggle";
import API from "./service/api";
import axios from "axios";
import { useDarkMode } from "./components/useDarkMode";
import starwars from "./images/starwars_logo.png";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./components/Theme";
import { GlobalStyles } from "./components/Global";

function App() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, toggleTheme] = useDarkMode();

  const getCharacters = useRef();

  useEffect(() => {
    getCharacters.current();
  }, [getCharacters]);

  getCharacters.current = async () => {
    setLoading(true);
    const characters = await API.get(`/`);
    await characterData(characters.data.results);
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
    const homeworldURL = character.homeworld;
    const homeworldResponse = await axios.get(homeworldURL);
    character.homeworld = homeworldResponse.data.name;
  };

  const getSpecies = async (character) => {
    const speciesURL = character.species.toString();
    if (!character.species) return "Human";

    const speciesResponse = await axios.get(speciesURL);
    character.species = speciesResponse.data.name;
  };

  const pagination = async (number) => {
    const characters = await API.get(`/?page=${number}`);
    characterData(characters.data.results);
  };

  const characterSearch = async (e) => {
    e.preventDefault();
    const characters = await API.get(`/?search=${search}`);
    characterData(characters.data.results);
    setSearch("");
    setTimeout(() => window.location.reload(), 5000);
  };

  const handleChange = (e) => setSearch(e.target.value);

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const iconToggle =
    theme === "light"
      ? "You're part of the Rebel Alliance, good choice"
      : "Don't get seduced by the darkside";

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <main className="App">
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        <img src={starwars} alt="starwars" />
        <h5>{iconToggle}!</h5>
        <Form search={characterSearch} handleChange={handleChange} />
        {loading ? <Loading /> : <CharacterTable characters={characters} />}
        <Pagination pagination={pagination} loading={loading} />
      </main>
    </ThemeProvider>
  );
}

export default App;
