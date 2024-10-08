import { useNavigate } from "react-router-dom";
import { PokemonDataResponse } from "../PokeListPage.duck";
import css from "../PokemonList.module.css";

const PokeItem = ({ pokemon }: { pokemon: PokemonDataResponse }) => {
  const navigate = useNavigate();
  const { name, id } = pokemon;

  const handleClick = () => {
    navigate(`/pokemon/${id}`);
  };
  return (
    <div className={css.pokemonItem} onClick={handleClick}>
      <div className={css.pokemonItemImage}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
        />
      </div>
      <p>{name}</p>
    </div>
  );
};

export default PokeItem;
