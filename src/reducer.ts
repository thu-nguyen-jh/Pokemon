import { combineReducers } from "redux";
import pokemonsReducer from "./extensions/Pokemon/containers/PokeListPage/PokeListPage.duck";
import paginationReducer from "./extensions/Pokemon/containers/PokeListPage/components/Pagination.duck";

const rootReducer = combineReducers({
	pokemons: pokemonsReducer,
	pageInfo: paginationReducer,
});

export default rootReducer;
