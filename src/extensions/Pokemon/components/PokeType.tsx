const PokeType = ({ name }: { name: string }) => {
  let textColor;
  let bgColor;
  switch (name) {
    case "bug":
      textColor = "#fff";
      bgColor = "#729f3f";
      break;
    case "dragon":
      textColor = "#fff";
      bgColor = "linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)";
      break;
    case "fairy":
      textColor = "#212121";
      bgColor = "#fdb9e9";
      break;
    case "ghost":
      textColor = "#fff";
      bgColor = "#7b62a3";
      break;
    case "ground":
      textColor = "#212121";
      bgColor = "linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)";
      break;
    case "fire":
      textColor = "#fff";
      bgColor = "#fd7d24";
      break;
    case "normal":
      textColor = "#212121";
      bgColor = "#a4acaf";
      break;
    case "psychic":
      textColor = "#fff";
      bgColor = "#f366b9";
      break;
    case "steel":
      textColor = "#212121";
      bgColor = "#9eb7b8";
      break;
    case "dark":
      textColor = "#fff";
      bgColor = "#707070";
      break;
    case "electric":
      textColor = "#212121";
      bgColor = "#eed535";
      break;
    case "fighting":
      textColor = "#fff";
      bgColor = "#d56723";
      break;
    case "flying":
      textColor = "#212121";
      bgColor = "linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)";
      break;
    case "grass":
      textColor = "#212121";
      bgColor = "#9bcc50";
      break;
    case "ice":
      textColor = "#212121";
      bgColor = "#51c4e7";
      break;
    case "rock":
      textColor = "#fff";
      bgColor = "#a38c21";
      break;
    case "poison":
      textColor = "#fff";
      bgColor = "#b97fc9";
      break;
    case "water":
      textColor = "#fff";
      bgColor = "#4592c4";
      break;
  }
  return (
    <button style={{ color: textColor, background: bgColor }}>{name}</button>
  );
};

export default PokeType;
