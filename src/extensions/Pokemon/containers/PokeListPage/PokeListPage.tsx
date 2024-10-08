import { useEffect } from "react";
import PokeItem from "./components/PokeItem";
import { useAppDispatch } from "../../../../store";
import Pagination from "./components/Pagination";
import {
  fetchPokemons,
  getLoadingStatus,
  getPokemons,
} from "./PokeListPage.duck";
import { getPageInfo } from "./components/Pagination.duck";
import css from "./PokemonList.module.css";
import { useSelector } from "react-redux";

const PokeList = () => {
  const pokemons = useSelector(getPokemons);
  const pageInfo = useSelector(getPageInfo);
  const isLoading = useSelector(getLoadingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchPokemons({
        page: pageInfo.page,
        itemPerPage: pageInfo.itemPerPage,
      })
    );
  }, [dispatch, pageInfo.itemPerPage, pageInfo.page]);
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={css.container}>
      <h1>Pokemon List</h1>
      {pokemons.length > 0 ? (
        <div className={css.pokemonList}>
          {pokemons.map((pokemon, index) => {
            return <PokeItem key={index} pokemon={pokemon} />;
          })}
        </div>
      ) : (
        <p>There are no Pokemon in the data</p>
      )}
      <Pagination />
    </div>
  );
};

export default PokeList;
