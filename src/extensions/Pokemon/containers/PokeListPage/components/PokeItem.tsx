import { useNavigate } from "react-router-dom";
import { PokemonDataResponse } from "../PokeListPage.duck";
import style from "../PokemonList.module.css";

const PokeItem = ({ pokemon }: { pokemon: PokemonDataResponse }) => {
  const navigate = useNavigate();
  const { name, id } = pokemon;

  const handleClick = () => {
    navigate(`/pokemon/${id}`);
  };
  return (
    <div className={style.pokemon_item} onClick={handleClick}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt=""
      />
      <p>{name}</p>
    </div>
  );
};

export default PokeItem;
