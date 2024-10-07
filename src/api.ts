import axios from "axios";

export const baseUrlPokemonsAPI = "https://pokeapi.co/api/v2/pokemon/";

export async function callApi(api: string) {
	try {
		const response = await axios.get(api)
		return response.data
	} catch (error) {
		return error;
	}
}
