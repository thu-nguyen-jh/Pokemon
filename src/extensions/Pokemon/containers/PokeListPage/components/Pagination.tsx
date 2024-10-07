import { useSelector, useAppDispatch } from "../../../../../lib/store";
import {
  getPageInfo,
  triggerNextPage,
  triggerPrevPage,
} from "./Pagination.duck";
import { getLoadingStatus } from "../PokeListPage.duck";
import style from "../PokemonList.module.css";

function Pagination() {
  const pageInfo = useSelector(getPageInfo);
  const isLoading = useSelector(getLoadingStatus);

  const dispatch = useAppDispatch();

  const onClickChangePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    if (target.name === "prev") {
      dispatch(triggerPrevPage());
    } else {
      dispatch(triggerNextPage());
    }
  };

  if (isLoading) return;

  return (
    <>
      <div className={style.pokemon_pagination}>
        <button name="prev" onClick={onClickChangePage}>
          Prev
        </button>
        <p>
          {pageInfo.page + 1} / {pageInfo.totalPage}
        </p>
        <button name="next" onClick={onClickChangePage}>
          Next
        </button>
      </div>
    </>
  );
}

export default Pagination;
