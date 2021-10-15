import axios from "axios";

export const planet = (homeworld) => axios.get(homeworld);
export const species = (species) => axios.get(species);
