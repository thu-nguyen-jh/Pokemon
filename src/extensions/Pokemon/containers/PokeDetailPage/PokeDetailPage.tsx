import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Ability } from "../../../../types";
import PokeType from "../../components/PokeType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { getTotalPokemon } from "../PokeListPage/PokeListPage.duck";
import css from "./PokemonDetail.module.css";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  fetchPokemonDetail,
  getLoadingStatusDetail,
  getPokemonDetail,
} from "./PokeDetailPage.duck";
import { useAppDispatch } from "../../../../store";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertHeight(height: number) {
  const cm = height * 10;
  const ft = Math.floor(cm / 30.48);
  const inch = Math.round((cm / 30.48 - ft) * 12);
  return `${ft}' ${inch}"`;
}

const PokeDetail = () => {
  const totalPokemon = useSelector(getTotalPokemon);
  const isLoading = useSelector(getLoadingStatusDetail);
  const pokemonDetail = useSelector(getPokemonDetail);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(fetchPokemonDetail(id));
  }, [id]);

  const handleClick = () => {
    navigate("/");
  };
  const handleMovePrev = () => {
    if (id && +id > 1) navigate(`/pokemon/${+id - 1}`);
  };
  const handleMoveNext = () => {
    if (id && +id < totalPokemon) navigate(`/pokemon/${+id + 1}`);
  };
  const pokemonAbilities: Ability[] | undefined =
    pokemonDetail?.abilities.filter((item) => item.is_hidden === false);
  if (isLoading)
    return (
      <Layout>
        <motion.div
          key={"loading"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
          }}
          className={css.loading}
        >
          <FontAwesomeIcon icon={faSpinner} spin size="2xl" />
        </motion.div>
      </Layout>
    );

  if (!pokemonDetail) return;
  return (
    <div className={css.detailContainer}>
      <button onClick={handleMovePrev}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </button>
      <motion.div
        className={css.pokemonDetail}
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <div className={css.pokemonDetailHeader}>
          <button onClick={handleClick}>Back</button>
          <div>
            <h1>{capitalizeFirstLetter(pokemonDetail.name)}</h1>
          </div>
          <div></div>
        </div>
        <div className={css.pokemonDetailBody}>
          <div className={css.pokemonImage}>
            <img src={pokemonDetail.sprites.front_default} alt="" />
          </div>
          <div className={css.pokemonContent}>
            <div className={css.pokemonBox}>
              <div>
                <h2 className={css.detailTitle}>Height</h2>
                <p>{convertHeight(pokemonDetail.height)}</p>
              </div>
              <div>
                <h2 className={css.detailTitle}>Weight</h2>
                <p>{(pokemonDetail.weight / 4.5359237).toFixed(1)} lbs</p>
              </div>
              <div>
                <h2 className={css.detailTitle}>Abilities</h2>
                {pokemonAbilities?.map((item, index) => {
                  return (
                    <p key={index}>
                      {capitalizeFirstLetter(item.ability.name)}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className={css.pokemonType}>
              <h2>Type</h2>
              <div className={css.typeContainer}>
                {pokemonDetail.types.map((item, index) => (
                  <PokeType key={index} name={item.type.name} />
                ))}
              </div>
            </div>
            <div className={css.pokemonStat}>
              <h2>Statitics</h2>
              <table>
                <tbody>
                  <tr>
                    <th>HP</th>
                    <th>Attack</th>
                    <th>Defense</th>
                    <th>Special-attack</th>
                    <th>Special-defense</th>
                    <th>Speed</th>
                  </tr>
                  <tr>
                    <td>{pokemonDetail.stats[0].base_stat}</td>
                    <td>{pokemonDetail.stats[1].base_stat}</td>
                    <td>{pokemonDetail.stats[2].base_stat}</td>
                    <td>{pokemonDetail.stats[3].base_stat}</td>
                    <td>{pokemonDetail.stats[4].base_stat}</td>
                    <td>{pokemonDetail.stats[5].base_stat}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>

      <button onClick={handleMoveNext}>
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </button>
    </div>
  );
};

export default PokeDetail;
