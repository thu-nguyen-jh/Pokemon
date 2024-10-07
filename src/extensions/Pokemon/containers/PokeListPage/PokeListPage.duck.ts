import { Action, Dispatch } from "redux";
import { defaultPageQuery, PaginationActionType, SET_TOTAL_PAGE } from "./components/Pagination.duck";
import { baseUrlPokemonsAPI, callApi } from "../../../../api";
import { RootState } from "../../../../lib/store";


//initial state
export const initialDataResponse: PokemonDataResponse[] = [];

export const initialPokemonsState: PokemonState = {
	results: initialDataResponse,
	count: 0,
	loading: false,
	error: null,
};



//Action types

export const FETCH_POKEMONS_REQUEST = "FETCH_POKEMONS_REQUEST";
export const FETCH_POKEMONS_SUCCESS = "FETCH_POKEMONS_SUCCESS";
export const FETCH_POKEMONS_FAILURE = "FETCH_POKEMONS_FAILURE";

export interface PokemonDataResponse {
	name: string;
	url: string;
	id: number;
}

export interface PokemonsAPIResponse {
	count: number;
	next: string;
	previous: null;
	results: PokemonDataResponse[];
}

export interface PokemonState {
	loading: boolean;
	error: string | null;
	count: number,
	results: PokemonDataResponse[]
}

// Action interfaces
type FetchPokemonsRequestAction = Action<typeof FETCH_POKEMONS_REQUEST> & {};

type FetchPokemonsSuccessAction = Action<typeof FETCH_POKEMONS_SUCCESS> & {
	payload: PokemonsAPIResponse;
};

type FetchPokemonsFailureAction = Action<typeof FETCH_POKEMONS_FAILURE> & {
	error: string;
};

export type PokemonActionTypes =
	| FetchPokemonsRequestAction
	| FetchPokemonsSuccessAction
	| FetchPokemonsFailureAction;


//Reducer
const processData = (results: PokemonDataResponse[]): PokemonDataResponse[] => {
	return results.map((r) => {
		const id = parseInt(r.url.replace(baseUrlPokemonsAPI, ""));
		return { ...r, id } as PokemonDataResponse;
	});
};

function pokemonsReducer(
	state = initialPokemonsState,
	action: PokemonActionTypes
): PokemonState {
	switch (action.type) {
		case FETCH_POKEMONS_REQUEST:
			return { ...state, loading: true, error: null };
		case FETCH_POKEMONS_SUCCESS: {
			const data = processData(action.payload.results);
			return {
				...state,
				loading: false,
				count: action.payload.count,
				results: data
			};
		}
		case FETCH_POKEMONS_FAILURE:
			return { ...state, loading: false, error: action.error };
		default:
			return state;
	}
}


//Actions
export const fetchPokemons = (query = defaultPageQuery) => {
	return async (
		dispatch: Dispatch<PokemonActionTypes | PaginationActionType>
	) => {
		dispatch({ type: FETCH_POKEMONS_REQUEST });

		const limit = query.itemPerPage;
		const offset = query.page * query.itemPerPage;

		try {
			const data: PokemonsAPIResponse = await callApi(
				`${baseUrlPokemonsAPI}?limit=${limit}&offset=${offset}`
			);
		
			dispatch({
				type: FETCH_POKEMONS_SUCCESS,
				payload: data,
			});

			const totalPage = Math.ceil(data.count / limit);
			dispatch({
				type: SET_TOTAL_PAGE,
				payload: totalPage,
			});
		} catch (error) {
			dispatch({
				type: FETCH_POKEMONS_FAILURE,
				error: "Failed to fetch items",
			});
		}
	};
};


//Selectors


export const getLoadingStatus = (state: RootState) => state.pokemons.loading;
export const getPokemons = (state: RootState) => state.pokemons.results;
export const getTotalPokemon = (state: RootState) => state.pokemons.count;


export default pokemonsReducer;