import { PaginateInterface } from '../interfaces/paginate.interface';

export default (
  total: number,
  currentPage: number,
  limit: number
): PaginateInterface => {
  const maxPage = Math.ceil(total / limit);
  const offset = Math.floor((currentPage - 1) * limit);

  return {
    maxPage,
    currentPage,
    offset,
    limit
  };
};
