export default (array: object[], page: number, limit: number): object => {
  const offset = Math.floor((page - 1) * limit);
  const total = array.length || 0;
  const pages = Math.ceil(total / limit);

  const result = [...array].slice(offset, offset + limit);

  return {
    totalPages: pages,
    records: result,
    page,
    offset,
    limit,
    totalRecords: total,
  };
};
