import { combineReducers } from "redux";
import pokemonsReducer from "./extensions/Pokemon/containers/PokeListPage/PokeListPage.duck";
import paginationReducer from "./extensions/Pokemon/containers/PokeListPage/components/Pagination.duck";
import pokemonDetailReducer from "./extensions/Pokemon/containers/PokeDetailPage/PokeDetailPage.duck";

const rootReducer = combineReducers({
	pokemons: pokemonsReducer,
	pageInfo: paginationReducer,
	pokemonDetail: pokemonDetailReducer
});

export default rootReducer;
