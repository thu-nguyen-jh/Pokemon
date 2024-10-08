import { Action, Dispatch } from "redux";
import { fetchPokemonDetailAPI } from "../../../../api";
import { RootState } from "../../../../store";


//initial state
export const initialPokemonsState: PokemonDetailState = {
	data: null,
	loading: false,
	error: null,
};



//Action types

export const FETCH_POKEMONS_DETAIL_REQUEST = "FETCH_POKEMONS_DETAIL_REQUEST";
export const FETCH_POKEMONS_DETAIL_SUCCESS = "FETCH_POKEMONS_DETAIL_SUCCESS";
export const FETCH_POKEMONS_DETAIL_FAILURE = "FETCH_POKEMONS_DETAIL_FAILURE";


export interface Sprite {
  front_default: string,
  back_default: string,
}
export interface Stat {
  base_stat: number,
  effort: number,
  stat: {
    name: string
  }
}
export interface Type {
  slot: number,
  type: {
    name: string
  }
}
export interface Ability {
  is_hidden: boolean,
  ability: {
    name: string
  }
}
export interface PokemonDetailResponse {
  name: string,
  height: number,
  weight: number,
  sprites: {
    front_default: string,
    back_default: string,
  },
  stats: Stat[],
  types: Type[],
  abilities: Ability[]
}
// export interface PokemonsAPIResponse {
// 	count: number;
// 	next: string;
// 	previous: null;
// 	results: PokemonDataResponse[];
// }

export interface PokemonDetailState {
	loading: boolean;
	error: string | null;
	data: PokemonDetailResponse | null;
}

// Action interfaces
type FetchPokemonsRequestAction = Action<typeof FETCH_POKEMONS_DETAIL_REQUEST> & {};

type FetchPokemonsSuccessAction = Action<typeof FETCH_POKEMONS_DETAIL_SUCCESS> & {
	payload: PokemonDetailResponse;
};

type FetchPokemonsFailureAction = Action<typeof FETCH_POKEMONS_DETAIL_FAILURE> & {
	error: string;
};

export type PokemonActionTypes =
	| FetchPokemonsRequestAction
	| FetchPokemonsSuccessAction
	| FetchPokemonsFailureAction;



function pokemonDetailReducer(
	state = initialPokemonsState,
	action: PokemonActionTypes
): PokemonDetailState {
	switch (action.type) {
		case FETCH_POKEMONS_DETAIL_REQUEST:
			return { ...state, loading: true, error: null };
		case FETCH_POKEMONS_DETAIL_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload,
			};
		}
		case FETCH_POKEMONS_DETAIL_FAILURE:
			return { ...state, loading: false, error: action.error };
		default:
			return state;
	}
}


//Actions
export const fetchPokemonDetail = (id: number) => {
	return async (
		dispatch: Dispatch<PokemonActionTypes>
	) => {
		dispatch({ type: FETCH_POKEMONS_DETAIL_REQUEST });

		try {
			const data: PokemonDetailResponse = await fetchPokemonDetailAPI(id);
		
			dispatch({
				type: FETCH_POKEMONS_DETAIL_SUCCESS,
				payload: data,
			});

		} catch (error) {
			dispatch({
				type: FETCH_POKEMONS_DETAIL_FAILURE,
				error: "Failed to fetch items",
			});
		}
	};
};


//Selectors


export const getLoadingStatusDetail = (state: RootState) => state.pokemonDetail.loading;
export const getPokemonDetail = (state: RootState) => state.pokemonDetail.data;



export default pokemonDetailReducer;