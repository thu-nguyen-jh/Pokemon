import { useAppDispatch } from "../../../../../store";
import {
  getPageInfo,
  triggerChangePage,
  triggerNextPage,
  triggerPrevPage,
} from "./Pagination.duck";
import { getLoadingStatus } from "../PokeListPage.duck";
import css from "../PokemonList.module.css";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Pagination() {
  const pageInfo = useSelector(getPageInfo);
  const isLoading = useSelector(getLoadingStatus);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const page = searchParams.get("page");
  useEffect(() => {
    if (page) dispatch(triggerChangePage(+page - 1));
  }, [page]);

  const onClickChangePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    if (pageInfo.page > -1)
      if (target.name === "prev" && pageInfo.page > 0) {
        dispatch(triggerPrevPage());
        setSearchParams({ page: (pageInfo.page + 1 - 1).toString() });
      } else if (target.name === "next" && pageInfo.page < 65) {
        dispatch(triggerNextPage());
        setSearchParams({ page: (pageInfo.page + 2).toString() });
      }
  };

  if (isLoading) return;

  return (
    <>
      <div className={css.pokemonPagination}>
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
