import { useMemo } from "react";

type ColorScheme = {
  textColor: string;
  bgColor: string;
};

const colors: Record<string, ColorScheme> = {
  bug: { textColor: "#fff", bgColor: "#729f3f" },
  dragon: {
    textColor: "#fff",
    bgColor: "linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)",
  },
  fairy: { textColor: "#212121", bgColor: "#fdb9e9" },
  ghost: { textColor: "#fff", bgColor: "#7b62a3" },
  ground: {
    textColor: "#212121",
    bgColor: "linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)",
  },
  fire: { textColor: "#fff", bgColor: "#fd7d24" },
  normal: { textColor: "#212121", bgColor: "#a4acaf" },
  psychic: { textColor: "#fff", bgColor: "#f366b9" },
  steel: { textColor: "#212121", bgColor: "#9eb7b8" },
  dark: { textColor: "#fff", bgColor: "#707070" },
  electric: { textColor: "#212121", bgColor: "#eed535" },
  fighting: { textColor: "#fff", bgColor: "#d56723" },
  flying: {
    textColor: "#212121",
    bgColor: "linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)",
  },
  grass: { textColor: "#212121", bgColor: "#9bcc50" },
  ice: { textColor: "#212121", bgColor: "#51c4e7" },
  rock: { textColor: "#fff", bgColor: "#a38c21" },
  poison: { textColor: "#fff", bgColor: "#b97fc9" },
  water: { textColor: "#fff", bgColor: "#4592c4" },
};
function genteratePokeType(name: string): ColorScheme {
  return colors[name] || { textColor: "#fff", bgColor: "#000" }; // default colors
}

const PokeType = ({ name }: { name: string }) => {
  const colorProps = useMemo(() => genteratePokeType(name), [name]);
  return (
    <button
      style={{ color: colorProps.textColor, background: colorProps.bgColor }}
    >
      {name}
    </button>
  );
};

export default PokeType;
