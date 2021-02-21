import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const url = `https://swapi.dev/api/people`;

  const getCharacters = async () => {
    for (const character of characters) {
      const homeworldResponse = await character.homeworld;
      const homeworld = await axios
        .get(homeworldResponse)
        .then((res) => res.data);
      character.homeworld = homeworld.name;

      setCharacters(character);
      // console.log(character.species);
    }

    axios
      .get(url)
      .then(({ data }) => setCharacters(data.results))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCharacters();
  }, []);

  console.log(characters);

  return (
    <div className="App">
      <h1>Starwars</h1>
      <h2>May the force be with you</h2>
    </div>
  );
}

export default App;
