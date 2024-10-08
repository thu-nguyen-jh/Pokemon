import axios from "axios";

export const baseUrlPokemonsAPI = "https://pokeapi.co/api/v2/pokemon/";

const apiInstance = axios.create({
	baseURL: baseUrlPokemonsAPI
});

export const fetchPokemonsAPI = async ({offset, limit}: {offset: number, limit: number}) => {
	const {data} = await apiInstance.get('/', {
		params: {
			offset, limit
		}
	});
	return data;
}

export const fetchPokemonDetailAPI = async (id: string) => {
	const {data} = await apiInstance.get(`/${id}`);
	return data;
}