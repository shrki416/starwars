import { useEffect, useState } from "react";
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

  const fixURL = (url) => url.replace("http", "https");

  const getCharacters = async () => {
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
    const homeworldURL = fixURL(character.homeworld);
    const homeworldResponse = await axios.get(homeworldURL);
    character.homeworld = homeworldResponse.data.name;
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
    const characters = await API.get(`/?page=${number}`);
    characterData(characters.data.results);
  };

  const characterSearch = async (e) => {
    e.preventDefault();
    const characters = await API.get(`/?search=${search}`);
    console.log(characters.data.count);
    characterData(characters.data.results);
    setSearch("");
    setTimeout(() => window.location.reload(), 5000);
  };

  const handleChange = (e) => setSearch(e.target.value);

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => getCharacters(), []);

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <main className="App">
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        <img src={starwars} alt="starwars" />
        <h5>
          {theme === "light"
            ? "You're part of the Rebel Alliance, good choice"
            : "Don't get seduced by the darkside"}
          !
        </h5>
        <Form search={characterSearch} handleChange={handleChange} />
        {loading ? <Loading /> : <CharacterTable characters={characters} />}
        <Pagination pagination={pagination} loading={loading} />
      </main>
    </ThemeProvider>
  );
}

export default App;
