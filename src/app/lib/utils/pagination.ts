import { FETCH_ITEMS_LIMIT } from "../constants/numbers";

export const getTotalPages = (totalItems: number) => Math.ceil(totalItems / FETCH_ITEMS_LIMIT);
