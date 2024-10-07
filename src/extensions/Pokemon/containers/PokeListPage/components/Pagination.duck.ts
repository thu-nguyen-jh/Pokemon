import { Action, Dispatch } from "redux";
import { RootState } from "../../../../../lib/store";


export const defaultPageQuery: PokemonPageQuery = {
	page: 0,
	itemPerPage: 20,
};

export const initialPageInfo: PokemonPageInfo = {
	page: 0,
	itemPerPage: 20,
	totalPage: 0,
};


export interface PokemonPageBase {
	page: number;
	itemPerPage: number;
}

export type PokemonPageQuery = PokemonPageBase & {};

export type PokemonPageInfo = PokemonPageBase & {
	totalPage: number;
};

export const PREV_PAGE_ACTION = "PREV_PAGE_ACTION";
export const NEXT_PAGE_ACTION = "NEXT_PAGE_ACTION";
export const SET_TOTAL_PAGE = "SET_PAGE_INFO";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

type PrevPageAction = Action<typeof PREV_PAGE_ACTION> & {};
type NextPageAction = Action<typeof NEXT_PAGE_ACTION> & {};
type SetTotalPage = Action<typeof SET_TOTAL_PAGE> & {
	payload: number;
};
type SetCurrentPage = Action<typeof SET_CURRENT_PAGE> & {
	payload: number;
};

export type PaginationActionType =
	| PrevPageAction
	| NextPageAction
	| SetTotalPage
	| SetCurrentPage;



function paginationReducer(
  state = initialPageInfo,
  action: PaginationActionType
): PokemonPageInfo {
  switch (action.type) {
    case PREV_PAGE_ACTION: {
      if (state.page === 0) return state;
      return { ...state, page: state.page - 1 };
    }
    case NEXT_PAGE_ACTION: {
      if (state.page === state.totalPage) return state;
      return { ...state, page: state.page + 1 };
    }
    case SET_TOTAL_PAGE:
      return { ...state, totalPage: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
}

export const triggerPrevPage = () => {
	return (dispatch: Dispatch<PaginationActionType>) => {
		dispatch({ type: PREV_PAGE_ACTION });
	};
};

export const triggerNextPage = () => {
	return (dispatch: Dispatch<PaginationActionType>) => {
		dispatch({ type: NEXT_PAGE_ACTION });
	};
};

export const triggerChangePage = (page: number) => {
	return (dispatch: Dispatch<PaginationActionType>) => {
		dispatch({ type: SET_CURRENT_PAGE, payload: page });
	};
};

export const getPageInfo = (state: RootState) => state.pageInfo;

  export default paginationReducer;